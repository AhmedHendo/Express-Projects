import express from 'express';
import { getUsers, createUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router();

// Get all users
router.get('/', authenticateToken, getUsers);

// Create a new user
router.post('/', authenticateToken, createUser);

export default router;