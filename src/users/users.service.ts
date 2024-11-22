import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { json } from 'stream/consumers';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserParams, UpdateUserParams, CreateUserProfileParams, CreateUserPostParams } from 'src/utils/types';
import { Profile } from './entities/profile.entity';
import { CreateUserPostDto } from './dtos/create-user-posts.dto';
import { Post } from './entities/post.entity';
import { ProfileService } from './services/user-profile.service';
import { PostService } from './services/user-posts.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        private readonly profileService: ProfileService,
        private readonly postService: PostService
    ) { }

    async create(userDetails: CreateUserParams): Promise<CreateUserParams | null> {
        const newUser = await this.userRepository.create(userDetails);
        return await this.userRepository.save(newUser);
    }

    async findAll(): Promise<CreateUserDto[]> {
        return await this.userRepository.find({ relations: ['profile', 'posts'] });
    }

    async findOne(id: number): Promise<CreateUserDto | null> {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['profile', 'posts'],
        });
    }


    async update(id: number, userDetails: UpdateUserParams) {
        return await this.userRepository.update({ id }, { ...userDetails });
    }

    async delete(id: number) {
        return await this.userRepository.delete(id);
    }

    async createProfile(userId: number, profileParams: CreateUserProfileParams) {
        return this.profileService.createUserProfile(userId, profileParams);
    }

    async createPost(userId: number, postParams: CreateUserPostParams) {
        return this.postService.createUserPost(userId, postParams);
    }
}
