import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from 'src/database/database.types';

@Injectable()
export class UsersService {

    constructor(@Inject('KYSELY') private readonly db: Kysely<Database>) {}

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.db
                .selectFrom('users')
                .selectAll()
                .where('role', '=', role)
                .execute();
        }
        return this.db
            .selectFrom('users')
            .selectAll()
            .execute();
    }

    findOne(id: number) {
        return this.db
            .selectFrom('users')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirstOrThrow();
    }

    create(name: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.db
            .insertInto('users')
            .values({
                name: name,
                role: role
            })
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    update(id: number, role: 'INTERN' | 'ENGINEER' | 'ADMIN' ) {
        return this.db
            .updateTable('users')
            .set({
                role: role
            })
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirst();
    }

    delete(id: number) {
        return this.db
            .deleteFrom('users')
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirst();
    }
}