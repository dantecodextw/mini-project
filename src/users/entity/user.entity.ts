import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 25
    })
    name: string

    @Column({
        type: "integer",
    })
    age: number

    @Column({
        type: "boolean"
    })
    isMarried: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt: Date
}