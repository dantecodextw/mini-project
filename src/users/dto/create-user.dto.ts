import { IsBoolean, IsNumber, IsString, Max, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @MinLength(10)
    @MaxLength(25)
    name: string

    @IsNumber()
    @MaxLength(150)
    @MinLength(1)
    age: number

    @IsBoolean()
    isMarried: boolean
}