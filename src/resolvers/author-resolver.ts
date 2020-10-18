import {getRepository} from 'typeorm';
import {Resolver, Query, Arg, Mutation} from 'type-graphql';
import {Author} from "../entities/Author";
import {CreateAuthorInput} from "../inputs/create-author";

@Resolver(of => Author)
export class AuthorResolver {

    constructor() {

    }

    @Query(returns => [Author])
    authors() {
        return getRepository(Author).find();
    }

    @Mutation(() => Author)
    async createAuthor(@Arg("data") data: CreateAuthorInput) {
        const author = getRepository(Author).create(data);
        await author.save();
        return author;
    }
}