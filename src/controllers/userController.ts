import { Request, Response } from 'express';
import { User, users } from '../models/userModel';

export const getUsers = (req: Request, res: Response): void => {
    res.json(users);
};

export const createUser = (req: Request, res: Response): void => {
    const newUser: User = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response): void => {
    const id = req.params.id;
    const updatedUser: User = req.body;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        res.json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
};

export const deleteUser = (req: Request, res: Response): void => {
    const id = req.params.id;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
};
