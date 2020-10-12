import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {Book} from "./Book";

@Entity()
@ObjectType()
export class Author extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => [Book])
    @OneToMany(type => Book, book => book.author)
    books: Book[];

}
