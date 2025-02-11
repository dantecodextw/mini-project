import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import LoginUserDto from "./dto/login-user.dto.js";

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getAllUsers(): string {
        return 'All users list'
    }

    @Post('signup')
    createUser(@Body() body: CreateUserDto) {
        return this.userService.createUser(body)
    }

    @Post('login')
    loginUser(@Body() body: LoginUserDto) {
        return this.userService.loginUser(body)
    }
}