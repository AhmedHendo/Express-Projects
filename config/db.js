import { Pool } from 'pg';

let localPoolConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
};

const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Do not reject connection if certificate is suspicious/unverified, because some cloud PostgreSQL providers use certificates that may not fully verify locally.
} : localPoolConfig;

export const pool = new Pool (poolConfig);