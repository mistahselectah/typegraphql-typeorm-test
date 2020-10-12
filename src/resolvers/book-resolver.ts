import { Repository } from 'typeorm';
import {Resolver, Query, Arg, FieldResolver, Root, Mutation} from 'type-graphql';
import { Container } from 'typedi';
import {Book} from "../entities/Book";
import {ConnectionToken} from "../utils/db-connection";
import {CreateBookInput} from "../inputs/create-book";

@Resolver(of => Book)
export class BookResolver {

    private bookRepo: Repository<Book>;

    constructor() {
        const connection = Container.get(ConnectionToken);
        this.bookRepo = connection.getRepository(Book);
    }

    @Query(returns => [Book])
    books() {
        return this.bookRepo.find({
            relations: [ 'author' ]
        });
    }

    @Mutation(() => Book)
    async createBook(@Arg("data") data: CreateBookInput) {
        const book = this.bookRepo.create(data);
        await book.save();
        return book;
    }
}