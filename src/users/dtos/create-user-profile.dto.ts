import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserProfileDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    dob: string;
}