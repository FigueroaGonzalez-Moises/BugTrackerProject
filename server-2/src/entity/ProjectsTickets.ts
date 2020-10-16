import {Field, Int, ObjectType} from "type-graphql";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity('projectstickets')
export class ProjectsTickets {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column("integer")
  ticketid: number;

  @Field(() => Int)
  @Column("integer")
  projectid: number;
}
