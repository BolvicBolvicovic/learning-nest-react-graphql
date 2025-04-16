import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "role": "INTERN",
        },
        {
            "id": 2,
            "role": "ADMIN",
        },
        {
            "id": 3,
            "role": "ENGINEER",
        },
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(role: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        const usersByHightestId = [...this.users].sort((a,b)=> b.id - a.id);
        const newUser = {
            id: usersByHightestId[0].id + 1,
            role: role,
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, role: 'INTERN' | 'ENGINEER' | 'ADMIN' ) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, role: role };
            }
            return user;
        });

        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}