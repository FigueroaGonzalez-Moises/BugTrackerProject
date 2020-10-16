import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    OneToMany,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { UserProjects } from "./UserProjects";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    email: string;

    @Field()
    @Column("text")
    password: string;

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

    @OneToMany(() => UserProjects, userprojects => userprojects.userid)
    projects: UserProjects[];
}
