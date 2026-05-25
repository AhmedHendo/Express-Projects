CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE posts;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('Hendo', 'hendo@gmail.com', 'hendo');
INSERT INTO users (user_name, user_email, user_password) VALUES ('Fred', 'fred@gmail.com', 'fred');