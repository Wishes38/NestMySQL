import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsUsernameUnique } from "../validators/is-username-unique.validator";

export class UpdateUserDto {

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    password: string;
}