interface createUser {
    id: number,
    name: string,
    age: number,
    isMarried: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date
}

export default createUser