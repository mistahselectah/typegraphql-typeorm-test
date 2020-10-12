import { InputType, Field } from "type-graphql";
import {Author} from "../entities/Author";
import {ManyToOne} from "typeorm";

@InputType()
export class CreateBookInput {
    @Field(() => String)
    name: string;

    @Field(() => Number)
    pageCount: number;

    @Field(() => Number)
    authorId: number;
}