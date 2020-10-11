import { Repository } from 'typeorm';
import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Container } from 'typedi';
import {Author} from "../entities/Author";
import {ConnectionToken} from "../utils/db-connection";

@Resolver(of => Author)
export class AuthorResolver {

    private authorRepo: Repository<Author>;

    constructor() {
        const connection = Container.get(ConnectionToken);
        this.authorRepo = connection.getRepository(Author);
    }

    @Query(returns => [Author])
    authors() {
        return this.authorRepo.find();
    }
}