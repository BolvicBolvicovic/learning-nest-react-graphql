import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const kyselyProvider = {
    provide: 'KYSELY',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const dialect = new PostgresDialect({
            pool: new Pool({
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                user: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
            }),
        });

        return new Kysely({
            dialect,
        });
    },
};

@Module({
  imports: [ConfigModule],
  providers: [kyselyProvider],
  exports: [kyselyProvider],
})
export class DatabaseModule {}