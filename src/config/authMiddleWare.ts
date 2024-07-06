import { Request, Response, NextFunction } from 'express';
import { getUserId, User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import Config from '../config';

const secretKey = Config.JWT_SECRET;

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): Response | void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        if (!secretKey) {
            throw new Error('Secret key is not defined');
        }

        const decoded = jwt.verify(token, secretKey) as { id: string };
        (req as any).decoded = decoded;
        next();
    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
};

export const fetchUser = (req: Request, res: Response, next: NextFunction): Response | void => {
    const decoded = (req as any).decoded;

    if (!decoded || !decoded.id) {
        return res.status(401).send('Access denied. No user ID found in token.');
    }

    const user = getUserId(decoded.id);

    if (!user) {
        return res.status(404).send('User not found');
    }

    (req as any).user = user;
    next();
};