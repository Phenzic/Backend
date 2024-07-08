import express from "express";
import {
  signUp,
  signIn,
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController";
// import {  } from '../controllers/userController';
import { authenticateJWT } from "../config/authMiddleWare";

const router = express.Router();

// Auth routes
router.post("/signup", signUp);
router.post("/signin", signIn);

// User routes with authentication
router.get("/", authenticateJWT, getUsers);
// router.post('/', authenticateJWT, createUser);
router.get("/me", authenticateJWT, getUserById);
router.delete("/:id", authenticateJWT, deleteUser);
router.put("/:id", authenticateJWT, updateUserProfile);

export default router;
