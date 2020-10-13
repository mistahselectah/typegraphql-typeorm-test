import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {Author} from "./Author";

@Entity()
@ObjectType()
export class Book extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Number)
    @Column()
    pageCount: number;

    @Field(() => Number)
    @Column()
    authorId: number;

    @Field(() => Author, {nullable: true})
    @ManyToOne(type => Author, author => author.books)
    author: Author;

}
