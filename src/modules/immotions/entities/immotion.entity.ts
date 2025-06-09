import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, Like, OneToOne, JoinColumn, ManyToOne, Index } from 'typeorm';
@Index("userPost", ['user_id', 'post_id'], { unique: true })
@Entity({ name: "immotion" })
export class Immotion {
    @PrimaryGeneratedColumn({ name: "id", type: "bigint" })
    id?: number;

    @Column({ name: "user_id", type: "bigint", nullable: false })
    user_id: number | null

    @Column({ name: "post_id", type: "bigint", nullable: false })
    post_id: number | null

    @Column({ name: "comment", type: "text", nullable: true })
    comment?: string | null

    @Column({ name: "like", type: "int", nullable: true, default: 0 })
    like?: number | null

    @Column({ name: "shared", type: "boolean", nullable: true, default: false })
    shared?: boolean | null

    @ManyToOne(() => User, user => user.immotions, { onDelete: "CASCADE" })
    @JoinColumn([{ name: "user_id", referencedColumnName: "id", foreignKeyConstraintName: "immotionUser" }])
    user: User

    @ManyToOne(() => Post, post => post.immotions, { onDelete: "CASCADE" })
    @JoinColumn([{ name: "post_id", referencedColumnName: "id", foreignKeyConstraintName: "immotionPost" }])
    post: Post

}
