import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController';
import { signUp, signIn } from '../controllers/userController';
import { authenticateJWT } from '../config/authMiddleWare';

const router = express.Router();

// User routes
router.get('/', authenticateJWT, getUsers);
router.post('/', authenticateJWT, createUser);
router.put('/:id', authenticateJWT, updateUser);
router.delete('/:id', authenticateJWT, deleteUser);

// Auth routes
router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;
