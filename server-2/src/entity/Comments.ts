import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("comments")
export class Comments extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    commentid: number;

    @Field()
    @Column("text")
    comment: string;

    @Field(() => Int)
    @Column("text")
    parentid: number;

    @Field(() => Int)
    @Column("text")
    commenterid: number;

    @Field()
    @Column("text")
    commenter: string;

    @Field()
    @Column("text")
    createdAt: string;
}
