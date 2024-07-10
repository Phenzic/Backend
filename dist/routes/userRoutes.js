"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
// import {  } from '../controllers/userController';
const authMiddleWare_1 = require("../config/authMiddleWare");
const router = express_1.default.Router();
// Auth routes
router.post("/signup", userController_1.signUp);
router.post("/signin", userController_1.signIn);
// User routes with authentication
router.get("/", authMiddleWare_1.authenticateJWT, userController_1.getUsers);
// router.post('/', authenticateJWT, createUser);
router.get("/me", authMiddleWare_1.authenticateJWT, userController_1.getUserById);
router.delete("/:id", authMiddleWare_1.authenticateJWT, userController_1.deleteUser);
router.get("/:id", authMiddleWare_1.authenticateJWT, userController_1.updateUserProfile);
exports.default = router;
