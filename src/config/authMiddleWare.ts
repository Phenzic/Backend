import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Config from '.';

const secretKey = Config.JWT_SECRET;

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): Response | void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        (req as any).user = decoded;
        return next();
    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
};
