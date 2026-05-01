import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import dotenv from 'dotenv';

dotenv.config();

const secret_key = process.env.JWT_SECRET as string;

// extend payload to include userId
interface JwtPayload {
    userId?: string;
}

interface AuthRequest extends Request {
    user?: {
        id: string,
        email: string
    }
}


export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // get the token
        const token = req.cookies.token;
        // if does not have token, unauthenticated
        if (!token) {
            return res.send(401).json({msg: 'Unauthorized token'});
        }
        // verify the token
        const decoded = jwt.verify(token, secret_key) as JwtPayload;

        // the token has the user id that this token belongs to
        // the token's property should either be id or userId, i think userId
        const user = await prisma.user.findUnique({
            // we don't want to get the password
            select: {id: true, email: true},
            where: { id: decoded.userId } 
        });

        if (!user) {
            return res.send(401).json({msg: 'Unauthorized token'});
        }
        
        req.user = {id: user.id, email: user.email };
        next();
    }
    catch (err) {
        res.send(401).json({msg: 'Invalid or expired token'});
    }
}

