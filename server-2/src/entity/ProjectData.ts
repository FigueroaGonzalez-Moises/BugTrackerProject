import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TicketData } from "./TicketData";

@ObjectType()
@Entity("projects")
export class ProjectData {
    @Field(() => Int, { nullable: true })
    @PrimaryGeneratedColumn()
    projectid: number;

    @Field({ nullable: true })
    @Column("text")
    title: string;

    @Field({ nullable: true })
    @Column("text")
    description: string;

    @OneToMany(() => TicketData, ticket => ticket.belongsto)
    projectstickets: TicketData[];
}
