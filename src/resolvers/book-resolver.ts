import {getRepository, In} from 'typeorm';
import {Resolver, Query, Arg, FieldResolver, Root, Mutation} from 'type-graphql';
import {Book} from "../entities/Book";
import {CreateBookInput} from "../inputs/create-book";
import {Author} from "../entities/Author";
import {Loader} from "type-graphql-dataloader";
import DataLoader = require("dataloader");

@Resolver(of => Book)
export class BookResolver {

    constructor() {

    }

    @Query(() => [Book])
    async books(@Root() books: Book[]) {
        return getRepository(Book).find();
    }

    @FieldResolver()
    @Loader(async (authorIds) => {
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
        const book = getRepository(Book).create(data);
        await book.save();
        return book;
    }
}