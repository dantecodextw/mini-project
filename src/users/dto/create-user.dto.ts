import { IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(25)
    name: string

    @IsInt()
    @Max(150)
    @Min(1)
    age: number

    @IsBoolean()
    isMarried: boolean
}