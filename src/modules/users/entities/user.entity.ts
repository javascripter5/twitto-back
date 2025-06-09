import { Exclude } from "class-transformer";
import { Immotion } from "src/modules/immotions/entities/immotion.entity";
import { Session } from "src/modules/sessions/entities/session.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
export enum OauthType {
    google = "google",
    facebook = "facebook",
    linkedin = "linkedin",
    twitter = "twitter"
}
@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn({ name: "id", type: "bigint" })
    id?: number

    @Column({ type: "varchar", length: 255, nullable: true, default: "" })
    oauthId?: string

    @Column({ type: "enum", nullable: true, enum: OauthType })
    oauthType?: OauthType

    @Column({ name: "fname", type: "varchar", nullable: true, default: "" })
    name?: string


    // @Column({ name: "layoutStyle", type: "varchar", nullable: true, default: "classic" })
    // layoutStyle?: string

    @Column({ name: "address", type: "varchar", nullable: true, length: 255 })
    address?: string

    @Column({ name: "email", type: "varchar", length: 255, nullable: true })
    email?: string

    @Column({ name: "password", type: "varchar", length: 255, nullable: true })
    @Exclude()
    password?: string

    @Column({ name: "age", type: "timestamp", nullable: true })
    age?: string

    @Column({ name: "phone", type: "varchar", length: 255, nullable: true })
    phone?: string


    @Column({ name: "image", type: "varchar", length: 255, nullable: true })
    image?: string

    @Column({ name: "language", type: "varchar", nullable: true })
    language?: string | null

    @Column({ name: "country", type: "varchar", nullable: true })
    country?: string | null

    @CreateDateColumn({ name: "created_at", nullable: true })
    created_at?: Date | null;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updated_at?: Date | null;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deleted_at?: Date | null;

    @OneToMany(() => Immotion, (Immotion: Immotion) => Immotion.user)
    immotions?: Immotion[]

    @OneToMany(() => Session, (Session: Session) => Session.user)
    sessions?: Session[]
}
