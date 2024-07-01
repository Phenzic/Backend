"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const userModel_1 = require("../models/userModel");
const getUsers = (req, res) => {
    res.json(userModel_1.users);
};
exports.getUsers = getUsers;
const createUser = (req, res) => {
    const newUser = req.body;
    userModel_1.users.push(newUser);
    res.status(201).json(newUser);
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    const userIndex = userModel_1.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        userModel_1.users[userIndex] = updatedUser;
        res.json(updatedUser);
    }
    else {
        res.status(404).send('User not found');
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const id = req.params.id;
    const userIndex = userModel_1.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        userModel_1.users.splice(userIndex, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send('User not found');
    }
};
exports.deleteUser = deleteUser;
