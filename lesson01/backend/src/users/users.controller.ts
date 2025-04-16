import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }
    // If I want to have other static routes, I need to put them before the dynamic route.

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post() // POST /users
    create(@Body() user: {role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        return this.usersService.create(user.role);
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: {role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        return this.usersService.update(+id, userUpdate.role);
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
