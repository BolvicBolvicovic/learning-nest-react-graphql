import { Injectable, Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from 'src/database/database.types';
import { Pet, PetInput } from './pet.entity';

@Injectable()
export class PetsService {

    constructor(@Inject('KYSELY') private readonly db: Kysely<Database>) {}

    async findAll(): Promise<Pet[]> {
        return this.db.selectFrom('pets').selectAll().execute();
    }

    async findOne(id: number): Promise<Pet> {
        return this.db
            .selectFrom('pets')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirstOrThrow();
    }

    async create(petInput: PetInput): Promise<Pet> {
        return this.db
            .insertInto('pets')
            .values(petInput)
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    async delete(id: number): Promise<Pet> {
        return this.db
            .deleteFrom('pets')
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
}
