import { Repository } from 'typeorm';
import {Resolver, Query, Arg, FieldResolver, Root, Mutation} from 'type-graphql';
import { Container } from 'typedi';
import {Author} from "../entities/Author";
import {ConnectionToken} from "../utils/db-connection";
import {CreateAuthorInput} from "../inputs/create-author";

@Resolver(of => Author)
export class AuthorResolver {

    private authorRepo: Repository<Author>;

    constructor() {
        const connection = Container.get(ConnectionToken);
        this.authorRepo = connection.getRepository(Author);
    }

    @Query(returns => [Author])
    authors() {
        return this.authorRepo.find({
            relations: [ 'books']
        });
    }

    @Mutation(() => Author)
    async createAuthor(@Arg("data") data: CreateAuthorInput) {
        const author = this.authorRepo.create(data);
        await author.save();
        return author;
    }
}