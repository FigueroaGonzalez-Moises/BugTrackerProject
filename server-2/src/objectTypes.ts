import { Column } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class AuthResponse {
    @Field()
    accessToken: string;

    @Field()
    refreshToken?: string;
}

@ObjectType()
export class UserData {
    @Field(() => Int)
    @Column("integer")
    id: number;

    @Field()
    @Column("text")
    email: string;

    @Field()
    @Column("text")
    role: string;

    @Field()
    @Column("text")
    username: string;

    @Field()
    @Column("text")
    firstname: string;

    @Field()
    @Column("text")
    lastname: string;
}

@ObjectType()
export class BasicUserData {
    @Field()
    @Column("text")
    username: string;

    @Field(() => Int)
    @Column("integer")
    id: number;
}

@ObjectType()
export class projectTickets {
    @Field(() => Int)
    @Column("integer")
    ticketid: number;

    @Field()
    @Column("text")
    title: string;

    @Field({ nullable: true })
    @Column("text")
    description?: string;

    @Field()
    @Column("text")
    submitter: string;

    @Field()
    @Column("text")
    developer: string;

    @Field()
    @Column("text")
    status: string;
}

@ObjectType()
export class projectUsers {
    @Field(() => Int)
    @Column("integer")
    id: number;

    @Field()
    @Column("text")
    email: string;

    @Field()
    @Column("text")
    role: string;

    @Field()
    @Column("text")
    username: string;
}

@ObjectType()
export class UserTicketsPlus {
    @Field(() => Int, { nullable: true })
    @Column("integer")
    ticketid: number;

    @Field()
    @Column("text")
    title: string;

    @Field(() => Int, { nullable: true })
    @Column("integer")
    userid: number;

    @Field(() => Int, { nullable: true })
    @Column("integer")
    id: number;

    @Field({ nullable: true })
    @Column("text")
    priority: string;

    @Field({ nullable: true })
    @Column("text")
    type: string;

    @Field({ nullable: true })
    @Column("text")
    status: string;
}
