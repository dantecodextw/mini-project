import { Module } from "@nestjs/common";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";
import { User } from "./entity/user.entity.js";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],

})
export class UserModule { }
