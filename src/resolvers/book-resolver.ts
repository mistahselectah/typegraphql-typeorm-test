import {getRepository, In, Repository} from 'typeorm';
import {Resolver, Query, Arg, FieldResolver, Root, Mutation} from 'type-graphql';
import { Container } from 'typedi';
import {Book} from "../entities/Book";
import {ConnectionToken} from "../utils/db-connection";
import {CreateBookInput} from "../inputs/create-book";
import {Author} from "../entities/Author";
import {Loader} from "type-graphql-dataloader";
import DataLoader = require("dataloader");

@Resolver(of => Book)
export class BookResolver {

    private bookRepo: Repository<Book>;
    private authorRepo: Repository<Author>;

    constructor() {
        const connection = Container.get(ConnectionToken);
        this.bookRepo = connection.getRepository(Book);
        this.authorRepo = connection.getRepository(Author);
    }

    @Query(() => [Book])
    async books(@Root() books: Book[]) {
        return this.bookRepo.find();
    }

    @FieldResolver()
    @Loader<number, Book[]>(async (authorIds) => {
        return getRepository(Author).find({
            where: {  id: In([...authorIds]) }
        });
    })
    author(@Root() book: Book) {
        return (dataloader: DataLoader<number, Book[]>) => {
            return dataloader.load(book.authorId);
        }
    }

    @Mutation(() => Book)
    async createBook(@Arg("data") data: CreateBookInput) {
        const book = this.bookRepo.create(data);
        await book.save();
        return book;
    }
}