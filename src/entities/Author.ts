import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {Book} from "./Book";

@Entity()
@ObjectType()
export class Author {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Book)
    @OneToMany(type => Book, book => book.author)
    books: Book[];

}
