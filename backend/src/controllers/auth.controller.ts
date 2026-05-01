import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import dotenv from 'dotenv';

dotenv.config();

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
}

const secret_key = process.env.JWT_SECRET as string;

export const authController = {
    async register(req: Request, res: Response) {
        try {
            // get user inputs
            const { email, password, name } = req.body;

            // address missing fields
            if (!email || !password || !name) {
                return res.status(400).json({msg: 'Missing required fields'});
            }

            if (password.length < 8) {
                return res.status(400).json({ msg: 'Password must be at least 8 characters' });
            }

            const sanitizedEmail = email.toLowerCase().trim();

            // check if user exists
            const userExists = await prisma.user.findUnique({ where: { email: sanitizedEmail } });
            if (userExists) {
                return res.status(400).json({msg: 'User already exists'});
            }

            // else, a new user
            // hash their password
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email: sanitizedEmail,
                    password: hashedPassword,
                    name
                }
            });

            // sign jwt 
            const token = jwt.sign({ userId: user.id, email: user.email }, secret_key, { expiresIn: '24hr' });
            // send cookie with token to the client
            res.cookie('token', token, {
                httpOnly: true,    
                secure: process.env.NODE_ENV === 'production',      
                sameSite: 'strict', 
                maxAge: 24 * 60 * 60 * 1000 
            });
            
            // send response 
            res.status(201).json({
                user:{
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        }
        catch (err) {
            res.status(500).json({msg: 'Error registering user', err});
        }
    },

    async login(req: Request, res: Response) {
        try {
            // get user inputs
            const { email, password} = req.body;

            // address missing fields
            if (!email || !password) {
                return res.status(400).json({msg: 'Missing required fields'});
            }

            const sanitizedEmail = email.toLowerCase().trim();

            // check if user exists
            const user = await prisma.user.findUnique({ where: { email: sanitizedEmail } });
            if (!user) {
                return res.status(401).json({msg: 'Invalid Credentials'});
            }

            // check if password is valid 
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({msg: 'Invalid Credentials'});
            }

            // sign jwt, send response with user details and signed token
            const token = jwt.sign({ userId: user.id, email: user.email }, secret_key, { expiresIn: '24hr' });

            res.cookie('token', token, {
                httpOnly: true,    
                secure: process.env.NODE_ENV === 'production',      
                sameSite: 'strict', 
                maxAge: 24 * 60 * 60 * 1000 
            });

            res.status(201).json({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        }
        catch (err) {
            res.status(500).json({msg: 'Error logging', err});
        }
    },

    async logout(req: Request, res: Response) {
        res.clearCookie('token');
        return res.status(200).json({ msg: 'Logged out successfully' });
    }
};