import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function createDb() {
    const config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: 'postgres', // Connect to default DB first
    };

    const client = new Client(config);

    try {
        await client.connect();
        // Check if db exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = 'lottery_db'`);
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE lottery_db`);
            console.log("Database 'lottery_db' created successfully.");
        } else {
            console.log("Database 'lottery_db' already exists.");
        }
    } catch (err) {
        console.error("Error creating database:", err);
    } finally {
        await client.end();
    }
}

createDb();
