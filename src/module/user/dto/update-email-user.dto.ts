import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateEmailUserDto extends PartialType(CreateUserDto) {
    email: string;
}
