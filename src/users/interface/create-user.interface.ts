import { User } from "../entity/user.entity"

export type createUser = Omit<User, 'password'>
