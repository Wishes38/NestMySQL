import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsUsernameUnique } from "../validators/is-username-unique.validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}