import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserProfileParams } from "src/utils/types";
import { Profile } from "../entities/profile.entity";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUserProfile(
        id: number,
        createUserProfileParams: CreateUserProfileParams) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException(
                'User not found. Cannot create Profile',
                HttpStatus.BAD_REQUEST,
            )
        }

        const newProfile = this.profileRepository.create(createUserProfileParams);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        return this.userRepository.save(user);
    }

    async getUserProfile(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['profile'],
        });

        if (!user || !user.profile) {
            throw new HttpException(
                'Profile not found for the given user',
                HttpStatus.NOT_FOUND,
            );
        }

        return user.profile;
    }
}