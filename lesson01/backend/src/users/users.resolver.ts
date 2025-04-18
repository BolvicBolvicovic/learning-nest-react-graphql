import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Resolver()
export class UsersResolver {

    constructor(private usersService: UsersService) {}

    @Query(returns => [User])
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Query(returns => User)
    async findOne(@Args('id') id: string): Promise<User | undefined> {
        return this.usersService.findOne(+id);
    }

    @Mutation(returns => User)
    async createUser(@Args('userInput') userInput: {name: string, role: 'INTERN' | 'ADMIN' | 'ENGINEER'}): Promise<User> {
        return this.usersService.create(userInput.name, userInput.role);
    }

    @Mutation(returns => User)
    async deleteUser(@Args('id') id: string): Promise<User | undefined> {
        return this.usersService.delete(+id);
    }
}