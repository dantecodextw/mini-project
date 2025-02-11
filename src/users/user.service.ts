import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { createUser } from "./interface/create-user.interface";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import LoginUserDto from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtSerive: JwtService
    ) { }
    getAllUsers() {

    }

    async createUser(body: CreateUserDto): Promise<createUser> {

        body.password = await bcrypt.hash(body.password, 12)

        let newUser = this.userRepo.create(body)
        newUser = await this.userRepo.save(newUser)
        delete newUser.password

        return newUser

    }

    async loginUser(body: LoginUserDto): Promise<any> {
        const user = await this.userRepo.findOne({
            where: [
                { username: body.username },
                { email: body.email }
            ]
        })

        if (!user || !(await bcrypt.compare(body.password, user.password))) {
            throw new NotFoundException('Invalid credentials')
        }

        const token = await this.jwtSerive.signAsync({ sub: user.id, name: user.username })

        return {
            ...user,
            password: undefined,
            accessToken: token,
            passwordResetAt: undefined
        }


    }
}