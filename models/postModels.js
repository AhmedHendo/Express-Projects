import { pool } from '../config/db.js';

export const getPostsDb = (limit, offset) => {
    return pool.query('Select * from posts order by id asc LIMIT $1 OFFSET $2',
        [limit, offset]
    );
};

export const getPostDb = (id) => {
    return pool.query(
            'Select * from posts where id = $1',
            [id]
        );
};

export const createPostDb = (id, title) => {
    return pool.query(
      'Insert into posts (id, title) values ($1, $2)',
      [id, title]  
    );
};

export const updatePostDb = (id, title) => {
    return pool.query(
        'UPDATE posts SET title = $2 WHERE id = $1',
        [id, title]
    );
};

export const deletePostDb = (id) => {
    return pool.query(
        'Delete from posts where id = $1',
        [id]  
    );
};