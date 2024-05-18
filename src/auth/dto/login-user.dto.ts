import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignInDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    password: string
}
