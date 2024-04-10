import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// Auth User
// POST /api/users/login
// Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email: email
    });

    if(user){
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(isPasswordMatched){
            const token = jwt.sign({
                userId: user._id
            }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });

            // set jwt as http only cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })
        }else {
            return res.status(401).json({ message: 'Auth error' });
        }
    }else {
        return res.status(401).json({ message: 'Auth error' });
    }
});

// register user
// POST /api/users
// Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({
        email: email
    });

    if(userExist){
        return res.status(400).json({ message: 'User already exist' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        return res.status(400).json({ message: 'Invalid user' });
    }
});

// Logout user
// POST /api/users/logout
// private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    });
    return res.status(200).json({ message: 'Logout successfully' });
});

// Get User Profile
// GET /api/users/profile
// Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        return res.status(404).json('User not found');
    }
});

// Update User profile
// PUT /api/users/profile
// Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await user.save();

        return res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }else{
        return res.status(404).json('User not found');
    }
});

// Get Users
// GET /api/users
// Private
const getUsers = asyncHandler(async (req, res) => {
    return res.send('get users');
});

// Delete User
// DELETE /api/users/:id
// Private
const deleteUser = asyncHandler(async (req, res) => {
    return res.send('Delete user');
});

// Get User by id
// GET /api/users/:id
// Private
const getUserById = asyncHandler(async (req, res) => {
    return res.send('Get user by id');
});

// Update User
// PUT /api/users/:id
// Private
const updateUser = asyncHandler(async (req, res) => {
    return res.send('Update user');
});

export {
    authUser,
    updateUser,
    deleteUser,
    getUsers,
    logoutUser,
    updateUserProfile,
    registerUser,
    getUserProfile,
    getUserById
}