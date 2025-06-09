import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "setting" })
export class Setting {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ name: "currentToken", type: "varchar", length: 255, nullable: true })
    currentToken?: string

    @Column({ name: "endAt", type: "timestamp", nullable: true })
    endAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

    @CreateDateColumn()
    createdAt?: Date

}
