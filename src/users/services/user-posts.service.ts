




import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { CreateUserPostParams } from 'src/utils/types';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUserPost(userId: number, postParams: CreateUserPostParams) {
        const user = await this.userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new HttpException(
                'User not found. Cannot create post',
                HttpStatus.BAD_REQUEST,
            );
        }

        const newPost = this.postRepository.create({
            ...postParams,
            user,
        });

        return await this.postRepository.save(newPost);
    }

    async getUserPosts(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['posts'],
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user.posts;
    }
}
