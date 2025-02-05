import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { CreateUserDto } from "./dto/create-user.dto.js";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getAllUsers(): string {
        return 'All users list'
    }

    @Post()
    createUser(@Body() body: CreateUserDto) {
        return this.userService.createUser(body)
    }
}