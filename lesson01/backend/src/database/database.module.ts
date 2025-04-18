import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './database.types';

const kyselyProvider = {
    provide: 'KYSELY',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        // First connect to postgres database to check if our database exists
        const adminPool = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'postgres'
        });

        try {
            // Check if database exists
            const result = await adminPool.query(
                "SELECT 1 FROM pg_database WHERE datname = $1",
                ['lesson01']
            );

            // Create database if it doesn't exist
            if (result.rows.length === 0) {
                console.log('Creating database lesson01...');
                await adminPool.query('CREATE DATABASE lesson01');
            }
        } finally {
            await adminPool.end();
        }

        // Now connect to our database
        const dialect = new PostgresDialect({
            pool: new Pool({
                host: 'localhost',
                port: 5432,
                user: 'postgres',
                password: 'postgres',
                database: 'lesson01',
            }),
        });

        const db = new Kysely<Database>({
            dialect,
        });

        try {
            // Try to query the pets table to check if it exists
            await db.selectFrom('pets').select('id').limit(1).execute();
        } catch (error) {
            // If table doesn't exist, create it
            console.log('Creating pets table...');
            await db.schema
                .createTable('pets')
                .addColumn('id', 'serial', (col) => col.primaryKey())
                .addColumn('name', 'varchar', (col) => col.notNull())
                .addColumn('type', 'varchar')
                .execute();
            await db.schema
                .createTable('users')
                .addColumn('id', 'serial', (col) => col.primaryKey())
                .addColumn('name', 'varchar', (col) => col.notNull())
                .addColumn('role', 'varchar')
                .execute();
        }

        return db;
    },
};

@Module({
    imports: [ConfigModule],
    providers: [kyselyProvider],
    exports: [kyselyProvider],
})
export class DatabaseModule {}