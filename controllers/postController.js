import { getPostsDb, getPostDb, createPostDb, updatePostDb, deletePostDb } from '../models/postModels.js';

// @desc Get all post
// @route GET /api/posts

export const getPosts = async (req, res, next) => {
    try {
        const limit = Number.parseInt(req.query.limit, 10) || null;
        const offset = Number.parseInt(req.query.offset, 10) || 0;

        const result = await getPostsDb(limit, offset);
        const posts = result.rows;

        if (!isNaN(limit) && limit > 0) {
            return res.status(200).json(posts.slice(0, limit));
        }

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

// @desc Get single post
// @route GET /api/posts/:id

export const getPost = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        // const post = posts.find((post) => post.id === id);

        const result = await getPostDb(id);
        const post = result.rows[0];

        if (!post) {
            const error = new Error(`Post with id ${id} not found`);
            error.status = 404;
            return next(error);
        }

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

// @desc Create new post
// @route POST /api/posts

export const createPost = async (req, res, next) => {
    try {
        if (!req.body.title) {
            const error = new Error(`Title is required.`);
            error.status = 400;
            return next(error);
        }

        let result = await getPostsDb();
        let posts = result.rows;

        const newPost = {
            id: posts[posts.length - 1].id + 1,
            title: req.body.title
        };

        await createPostDb(newPost.id, newPost.title);
        result = await getPostsDb();
        posts = result.rows;

        res.status(201).json(posts);
    } catch (error) {
        next(error);
    }
};

// @desc Update post
// @route PUT /api/posts/:id

export const updatePost = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id, 10);

        let result = await getPostDb(id);
        const post = result.rows[0];

        if (!post) {
            const error = new Error(`Post with id ${id} not found`);
            error.status = 404;
            return next(error);
        }

        await updatePostDb(id, req.body.title);
        result = await getPostsDb();
        const posts = result.rows;

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

// @desc Delete post
// @route Delete /api/posts/:id

export const deletePost = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id, 10);

        let result = await getPostDb(id);
        const post = result.rows[0];

        if (!post) {
            const error = new Error(`Post with id ${id} not found`);
            error.status = 404;
            return next(error);
        }

        await deletePostDb(id);
        result = await getPostsDb();
        const posts = result.rows;

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};