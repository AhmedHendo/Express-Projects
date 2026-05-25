import { getUsersDb, createUserDb } from '../models/userModels.js';
import bcrypt from 'bcrypt';

// @desc Get all users
// @route GET /api/users

export const getUsers = async (req, res, next) => {
    try {
        const limit = Number.parseInt(req.query.limit, 10);

        const result = await getUsersDb();
        const users = result.rows;

        if (!isNaN(limit) && limit > 0) {
            return res.status(200).json(users.slice(0, limit));
        }

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// @desc Create new user
// @route POST /api/users

export const createUser = async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            const error = new Error(`All fields are required.`);
            error.status = 400;
            return next(error);
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        };

        await createUserDb(newUser);
        const result = await getUsersDb();
        const users = result.rows;

        res.status(201).json(users);
    } catch (error) {
        next(error);
    }
};