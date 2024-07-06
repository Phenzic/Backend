"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.updateUserProfile = exports.getUserById = exports.getUsers = exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const userModel_1 = require("../models/userModel");
const config_1 = __importDefault(require("../config"));
const authMiddleWare_1 = require("../config/authMiddleWare");
const secretKey = config_1.default.JWT_SECRET;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield (0, userModel_1.hashPassword)(password);
    const newUser = { id: (0, uuid_1.v4)(), name, email, password: hashedPassword };
    userModel_1.users.push(newUser);
    const token = jsonwebtoken_1.default.sign({ id: newUser.id }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ token });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = userModel_1.users.find((u) => u.email === email);
    if (user && (yield (0, userModel_1.comparePassword)(password, user.password))) {
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    }
    else {
        res.status(401).send('Invalid email or password');
    }
});
exports.signIn = signIn;
const getUsers = (req, res) => {
    res.json(userModel_1.users);
};
exports.getUsers = getUsers;
const getUserById = (req, res) => {
    res.json(authMiddleWare_1.fetchUser);
};
exports.getUserById = getUserById;
// const getUserById = (id: string): User | undefined => {
//   return users.find(user => user.id === id);
// };
const createUser = (req, res) => {
    const newUser = req.body;
    userModel_1.users.push(newUser);
    res.status(201).json(newUser);
};
exports.createUser = createUser;
const updateUserProfile = (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    const userIndex = userModel_1.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        userModel_1.users[userIndex] = updatedUser;
        res.json(updatedUser);
    }
    else {
        res.status(404).send("User not found");
    }
};
exports.updateUserProfile = updateUserProfile;
const deleteUser = (req, res) => {
    const id = req.params.id;
    const userIndex = userModel_1.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        userModel_1.users.splice(userIndex, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send("User not found");
    }
};
exports.deleteUser = deleteUser;
