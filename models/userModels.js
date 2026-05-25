import { pool } from '../config/db.js';

export const getUsersDb = () => {
    return pool.query('Select * from users');
};

export const getUserByEmail = (email) => {
    return pool.query('Select * from users where user_email = $1',
        [email]
    );
};

export const createUserDb = (user) => {
    return pool.query(
      'Insert into users (user_name, user_email, user_password) values ($1, $2, $3)',
      [user.name, user.email, user.password]  
    );
};