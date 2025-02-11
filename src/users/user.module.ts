import { Module } from "@nestjs/common";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { ConfigModule, ConfigService } from "@nestjs/config";
import Joi from "joi";
import { User } from "./entity/user.entity.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRECT'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRE_TIME')
                }
            })
        })
    ],
    controllers: [UserController],
    providers: [UserService],

})
export class UserModule { }
