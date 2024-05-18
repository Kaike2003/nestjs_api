import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(35)
    title: string

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(300)
    description: string

}
