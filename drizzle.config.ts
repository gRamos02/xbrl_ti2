// import type { Config } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env

export default {
	schema: './src/lib/server/schema.ts',
	out: './migrations',
    dialect: 'postgresql',
	// driver: 'postgresql', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
        host: env.DB_HOST,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		database: env.DB_NAME,
        ssl: false,
	}
} satisfies Config;