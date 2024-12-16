// Make sure to install the 'pg' package 
import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from 'dotenv';
import * as schema from './schema';
dotenv.config();

export const db = drizzle({
    connection: {
        host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
        ssl: false,
    },
    schema 
});
 
