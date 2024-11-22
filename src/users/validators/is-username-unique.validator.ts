import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@ValidatorConstraint({ async: true })
export class IsUsernameUniqueConstraint implements ValidatorConstraintInterface {
    constructor(@InjectDataSource() private dataSource: DataSource) { } 

    async validate(username: string) {
        const userRepository = this.dataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { username } });
        return !user;
    }
}

export function IsUsernameUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUsernameUniqueConstraint,
        });
    };
}
