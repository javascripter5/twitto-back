import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: "session" })
export class Session {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ name: "user_id", type: "bigint" })
    user_id?: number

    @Column({ name: "device", type: "varchar", unique: true, length: 255 })
    device?: string

    @Column({ name: "ip", type: "varchar", nullable: true, length: 255 })
    ip?: string

    @Column({ name: "token", type: "text", nullable: true })
    token?: string

    @ManyToOne(() => User, (user: User) => user.sessions, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user?: User

    @CreateDateColumn({ name: "created_at", nullable: true })
    created_at?: Date | null;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updated_at?: Date | null;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deleted_at?: Date | null;

}