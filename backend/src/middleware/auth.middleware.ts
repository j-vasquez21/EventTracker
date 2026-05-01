import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import dotenv from 'dotenv';
import { JwtPayload } from '../types/auth.js';

dotenv.config();

const secret_key = process.env.JWT_SECRET as string;

// created the express.d.ts file with request interface that includes user: JwtPayload property 
//created the JwtPayload type 

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get the token
        const token = req.cookies.token;
        // if does not have token, unauthenticated
        if (!token) {
            return res.status(401).json({msg: 'Unauthorized: No token provided'});
        }

        // verify and decode token payload
        const decoded = jwt.verify(token, secret_key) as JwtPayload;

        // the token has the user id that this token belongs to
        // the token's property should either be id or userId, i think userId
        const user = await prisma.user.findUnique({
            // we don't want to get the password
            select: {id: true, email: true},
            where: { id: decoded.userId } 
        });

        if (!user) {
            return res.status(401).json({msg: 'Unauthorized token'});
        }
        
        req.user = {userId: user.id, email: user.email };
        next();
    }
    catch (err) {
        console.error("JWT Verification Error:", err);
        res.status(401).json({msg: 'Invalid or expired token'});
    }
}

