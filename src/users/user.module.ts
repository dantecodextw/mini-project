import { Module } from "@nestjs/common";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],

})
export class UserModule { }
