import { Generated } from 'kysely';

export interface Database {
    pets: PetsTable;
    // Add other tables here
}

export interface PetsTable {
    id: Generated<number>;
    name: string;
    type?: string;
}