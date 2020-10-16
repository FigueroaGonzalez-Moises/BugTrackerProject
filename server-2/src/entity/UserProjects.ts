import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('usersprojects')
export class UserProjects {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column("integer")
  projectid: number;

  @Field(() => Int)
  @Column("integer")
  userid: number;
}
