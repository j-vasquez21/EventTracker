import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

interface AuthRequest extends Request {
    user: {
        userId: string,
        token?: string
    };
}