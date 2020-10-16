import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("history")
export class History extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column("text")
    parentid: number;

    @Field()
    @Column("text")
    propertyChanged: string;

    @Field()
    @Column("text")
    oldValue: string;

    @Field()
    @Column("text")
    newValue: string;

    @Field()
    @Column("text")
    dateChanged: string;
}
