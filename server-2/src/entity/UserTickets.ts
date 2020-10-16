import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import {User} from "./User";

@ObjectType()
@Entity("userstickets")
export class UserTickets {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column("integer")
    ticketid: number;

    @Field(() => Int)
    @Column("integer")
    userid: number;
}
