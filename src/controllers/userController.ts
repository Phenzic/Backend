import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { User, users, hashPassword, comparePassword, getUserId } from '../models/userModel';
import config from '../config';
import dotenv from 'dotenv';
import { fetchUser } from '../config/authMiddleWare';

const secretKey = config.JWT_SECRET;

const signUp = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser: User = { id: uuidv4(), name, email, password: hashedPassword };

    users.push(newUser);
    const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ token });
};

const signIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);

    if (user && await comparePassword(password, user.password)) {
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid email or password');
    }
};


const getUsers = (req: Request, res: Response): void => {
  res.json(users);
};

const getUserById = (req: Request, res: Response): void => {
  res.json(fetchUser);
};

// const getUserById = (id: string): User | undefined => {
//   return users.find(user => user.id === id);
// };


const createUser = (req: Request, res: Response): void => {
  const newUser: User = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
};

const updateUserProfile = (req: Request, res: Response): void => {
  const id = req.params.id;
  const updatedUser: User = req.body;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).send("User not found");
  }
};

const deleteUser = (req: Request, res: Response): void => {
  const id = req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("User not found");
  }
};


export {signUp, signIn, getUsers, getUserById, updateUserProfile, createUser, deleteUser}