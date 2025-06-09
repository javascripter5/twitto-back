import { Immotion } from "src/modules/immotions/entities/immotion.entity";
import { AfterLoad, Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn({ name: "id", type: "bigint" })
    id?: number;

    @Column({ name: "article_id" })
    @Generated("uuid")
    article_id?: string


    @Column({ name: "title", type: "varchar", length: 255, nullable: false, unique: true })
    title?: string | null

    @Column({ name: "link", type: "text", nullable: true })
    link?: string | null

    @Column({ name: "keywords", array: true, type: "text", nullable: true, default: [] })
    keywords?: string[] | null

    @Column({ name: "creator", array: true, type: "text", nullable: true, default: [] })
    creator?: string[] | null

    @Column({ name: "video_url", type: "varchar", length: 255, nullable: true })
    video_url?: string | null

    @Column({ name: "description", type: "text", nullable: true })
    description?: string | null

    @Column({ name: "content", type: "text", nullable: true })
    content?: string | null

    @Column({ name: "pubDate", type: "timestamp", nullable: true })
    pubDate?: string | null

    @Column({ name: "image_url", type: "text", nullable: true })
    image_url?: string | null

    @Column({ name: "source_id", type: "varchar", nullable: true })
    source_id?: string | null

    @Column({ name: "source_priority", type: "bigint", nullable: true })
    source_priority?: number | null

    @Column({ name: "country", array: true, type: "text", nullable: true, default: [] })
    country?: string[] | null

    @Column({ name: "category", array: true, type: "text", nullable: true, default: [] })
    category?: string[] | null

    @Column({ name: "language", type: "varchar", nullable: true })
    language?: string | null

    @CreateDateColumn({ name: "created_at", nullable: true })
    created_at?: Date | null;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updated_at?: Date | null;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deleted_at?: Date | null;

    @OneToMany(() => Immotion, (Immotion: Immotion) => Immotion.post, { eager: true })
    immotions: Immotion[]

    likes: number = 0
    dislikes: number = 0
    comments: number = 0
    shareds: number = 0
    like: number = 0
    watches: number = 0

}
