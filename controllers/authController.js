import { getUserByEmail } from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../utils/jwtHelpers.js';

// @desc Check user authentication
// @route POST /api/auth/login

export const checkUser = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            const error = new Error(`All fields are required.`);
            error.status = 400;
            return next(error);
        }

        const user = await getUserByEmail(req.body.email);
        if (user.rows.length === 0) {
            const error = new Error(`Email is incorrect.`);
            error.status = 400;
            return next(error);
        }
        const validPassword = await bcrypt.compare(req.body.password, user.rows[0].user_password);
        if (!validPassword) {
            const error = new Error(`Password is incorrect.`);
            error.status = 400;
            return next(error);
        }

        let tokens = jwtTokens(user.rows[0]);
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

        res.status(201).json(tokens);
    } catch (error) {
        next(error);
    }
};

// @desc Refresh access token
// @route GET /api/auth/refreshToken

export const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token is missing' });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: err.message });
            }
            let tokens = jwtTokens(user);
            res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

            res.status(201).json(tokens);
        })
    } catch (error) {
        next(error);
    }
};

// @desc Delete refresh token
// @route DELETE /api/auth/refreshToken

export const revokeRefreshToken = async (req, res, next) => {
try {
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Refresh token deleted' });
} catch (error) {
    next(error);
}
};