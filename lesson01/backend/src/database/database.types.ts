import { Generated } from 'kysely';

export interface Database {
    pets: PetsTable;
    users: UsersTable;
    // Add other tables here
}

export interface PetsTable {
    id: Generated<number>;
    name: string;
    type?: string;
}

export interface UsersTable {
    id: Generated<number>;
    name: string;
    role?: string;
}