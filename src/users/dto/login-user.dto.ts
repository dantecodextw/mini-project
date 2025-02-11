import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, ValidateIf } from "class-validator"

class LoginUserDto {
    @ValidateIf(o => !o.email)
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    username: string

    @ValidateIf(o => !o.username)
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export default LoginUserDto