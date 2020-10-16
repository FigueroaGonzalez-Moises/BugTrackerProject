import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("tickets")
export class TicketData {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ticketid: number;

    @Field({ nullable: true })
    @Column("text")
    priority: string;

    @Field()
    @Column("text")
    title: string;

    @Field({ nullable: true })
    @Column("text")
    description: string;

    @Field({ nullable: true })
    @Column("text")
    type: string;

    @Field()
    @Column("text")
    submitter: string;

    @Field()
    @Column("text")
    developer: string;

    @Field()
    @Column("text")
    status: string;

    @Field()
    @Column("text")
    belongsto: string;
}
