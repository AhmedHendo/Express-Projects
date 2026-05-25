import express from 'express';
import { checkUser, refreshAccessToken, deleteRefreshToken } from '../controllers/authController.js';

const router = express.Router();

// Check if user is authenticated
router.post('/login', checkUser);

// Refresh access token
router.get('/refreshToken', refreshAccessToken);

// Delete refresh token
router.delete('/refreshToken', deleteRefreshToken);

export default router;