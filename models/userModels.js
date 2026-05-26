import { pool } from '../config/db.js';

export const getUsersDb = (limit, offset) => {
    return pool.query('Select user_id, user_name, user_email from users LIMIT $1 OFFSET $2',
        [limit, offset]
    );
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