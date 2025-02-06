import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import createUser from "./interface/create-user.interface";
import { QueryFailedError, Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }
    getAllUsers() {

    }

    async createUser(body: CreateUserDto): Promise<createUser> {
        let newUser = this.userRepo.create(body)
        newUser = await this.userRepo.save(newUser)
        return newUser
    }
}