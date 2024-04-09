import bcrypt from "bcryptjs";

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
    return res.send('Register user');
});

// Logout user
// POST /api/users/logout
// private
const logoutUser = asyncHandler(async (req, res) => {
    return res.send('Logout user');
});

// Get User Profile
// GET /api/users/profile
// Private
const getUserProfile = asyncHandler(async (req, res) => {
    return res.send('Get user profile');
});

// Update User profile
// PUT /api/users/profile
// Private
const updateUserProfile = asyncHandler(async (req, res) => {
    return res.send('Update user');
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