import express from "express";

import { getUserById, getUserProfile, getUsers, authUser,
    registerUser, updateUserProfile, updateUser, logoutUser,
    deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', registerUser);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;