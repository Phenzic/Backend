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
const database_1 = require("../config/database");
const secretKey = config_1.default.JWT_SECRET;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, dateOfBirth, phoneNumber, photo, profileDescription, facility, cadre, firstTimeConsultationFee, followUpConsultationFee, availableTime, annualLicense, fullLicense, nationalIdentification, medicalIndustryInsurance, lAndA, role, } = req.body;
    try {
        const db = (0, database_1.getDB)();
        const usersCollection = (0, userModel_1.getUsersCollection)(db);
        const existingUser = yield usersCollection.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User with this email already exists" });
            return;
        }
        const hashedPassword = yield (0, userModel_1.hashPassword)(password);
        const newUser = {
            id: (0, uuid_1.v4)(),
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
            role: role || "patient",
        };
        yield usersCollection.insertOne(newUser);
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, secretKey, { expiresIn: "1h" });
        res.status(201).json({ token });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const db = (0, database_1.getDB)();
        const usersCollection = (0, userModel_1.getUsersCollection)(db);
        const user = yield usersCollection.findOne({ email });
        if (user && (yield (0, userModel_1.comparePassword)(password, user.password))) {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
            res.json({ token });
        }
        else {
            res.status(401).send("Invalid email or password");
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.signIn = signIn;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDB)();
        const usersCollection = (0, userModel_1.getUsersCollection)(db);
        const users = yield usersCollection.find().toArray();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = req.decoded;
    try {
        const db = (0, database_1.getDB)();
        const usersCollection = (0, userModel_1.getUsersCollection)(db);
        const user = yield usersCollection.findOne({ id: decoded.id });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    try {
        const db = (0, database_1.getDB)();
        const usersCollection = (0, userModel_1.getUsersCollection)(db);
        yield usersCollection.insertOne(newUser);
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createUser = createUser;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
        const db = (0, database_1.getDB)();
        const usersCollection = (0, userModel_1.getUsersCollection)(db);
        const result = yield usersCollection.updateOne({ id }, { $set: updatedUser });
        if (result.modifiedCount > 0) {
            res.json(updatedUser);
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateUserProfile = updateUserProfile;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const db = (0, database_1.getDB)();
        const usersCollection = (0, userModel_1.getUsersCollection)(db);
        const result = yield usersCollection.deleteOne({ id });
        if (result.deletedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteUser = deleteUser;
