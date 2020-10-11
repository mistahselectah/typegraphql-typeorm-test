import { Repository } from 'typeorm';
import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Container } from 'typedi';
import {Book} from "../entities/Book";
import {ConnectionToken} from "../utils/db-connection";

@Resolver(of => Book)
export class BookResolver {

    private bookRepo: Repository<Book>;

    constructor() {
        const connection = Container.get(ConnectionToken);
        this.bookRepo = connection.getRepository(Book);
    }

    @Query(returns => [Book])
    books() {
        return this.bookRepo.find();
    }
}