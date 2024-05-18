import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string

    
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    firstname: string

    
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    lastname: string

    
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    password: string
}
