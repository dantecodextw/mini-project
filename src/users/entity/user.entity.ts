import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 25,
        unique: true,
        nullable: false
    })
    name: string

    @Column({
        type: "varchar",
        length: 25,
        unique: true,
        nullable: false
    })
    username: string

    @Column({
        type: "varchar",
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        type: "varchar",
        nullable: false,
    })
    password: string

    @Column({
        type: "timestamp",
        nullable: true
    })
    passwordResetAt: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt: Date
}
