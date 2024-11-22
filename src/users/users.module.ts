import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsUsernameUniqueConstraint } from './validators/is-username-unique.validator';
import { Profile } from './entities/profile.entity';
import { Post } from './entities/post.entity';
import { ProfileService } from './services/user-profile.service';
import { PostService } from './services/user-posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post])],
  controllers: [UserController],
  providers: [UserService, ProfileService, PostService, IsUsernameUniqueConstraint],
})
export class UserModule { }
