import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  User,
  getUsersCollection,
  hashPassword,
  comparePassword,

} from "../models/userModel";
import config from "../config";
import dotenv from "dotenv";
import { getDB } from '../config/database';


const secretKey = config.JWT_SECRET;


const signUp = async (req: Request, res: Response): Promise<void> => {
  const {
    fullName,
    email,
    password,
    dateOfBirth,
    phoneNumber,
    photo,
    profileDescription,
    facility,
    cadre,
    firstTimeConsultationFee,
    followUpConsultationFee,
    availableTime,
    annualLicense,
    fullLicense,
    nationalIdentification,
    medicalIndustryInsurance,
    lAndA,
    role
  } = req.body;

  try {
    const db = getDB();
    const usersCollection = getUsersCollection(db);

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: 'User with this email already exists' });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser: User = {
      id: uuidv4(),
      fullName,
      email,
      password: hashedPassword,
      dateOfBirth,
      phoneNumber,
      photo,
      profileDescription,
      facility,
      cadre,
      firstTimeConsultationFee,
      followUpConsultationFee,
      availableTime,
      annualLicense,
      fullLicense,
      nationalIdentification,
      medicalIndustryInsurance,
      lAndA,
      role: role || 'patient'
    };

    await usersCollection.insertOne(newUser);


    const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const db = getDB();
    const usersCollection = getUsersCollection(db);

    const user = await usersCollection.findOne({ email });

    if (user && await comparePassword(password, user.password)) {
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = getDB();
    const usersCollection = getUsersCollection(db);
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const decoded = (req as any).decoded;

  try {
    const db = getDB();
    const usersCollection = getUsersCollection(db);
    const user = await usersCollection.findOne({ id: decoded.id });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const createUser = async (req: Request, res: Response): Promise<void> => {
  const newUser: User = req.body;

  try {
    const db = getDB();
    const usersCollection = getUsersCollection(db);
    await usersCollection.insertOne(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updatedUser: User = req.body;

  try {
    const db = getDB();
    const usersCollection = getUsersCollection(db);
    const result = await usersCollection.updateOne({ id }, { $set: updatedUser });

    if (result.modifiedCount > 0) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const db = getDB();
    const usersCollection = getUsersCollection(db);
    const result = await usersCollection.deleteOne({ id });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
export {
  signUp,
  signIn,
  getUsers,
  getUserById,
  updateUserProfile,
  createUser,
  deleteUser,
};
