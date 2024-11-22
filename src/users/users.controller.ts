import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { CreateUserPostDto } from './dtos/create-user-posts.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async getUsers() {
        const users = await this.userService.findAll();
        return {
            success: true,
            data: users
        }
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        try {
            const user = await this.userService.findOne(id);
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return {
                success: true,
                data: user,
            };
        } catch (error) {
            throw new HttpException(error.message, error.status || 500);
        }
    }


    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Patch(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.delete(id);
    }

    @Post(':id/profiles')
    async createUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto) {
        try {
            const profile = await this.userService.createProfile(id, createUserProfileDto);
            return {
                success: true,
                data: profile,
            };
        } catch (error) {
            throw new HttpException(error.message, error.status || 500);
        }
    }

    @Post(':id/posts')
    async createUserPost(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserPostDto: CreateUserPostDto) {
        try {
            const post = await this.userService.createPost(id, createUserPostDto);
            return {
                success: true,
                data: post,
            };
        } catch (error) {
            throw new HttpException(error.message, error.status || 500);
        }
    }


}
