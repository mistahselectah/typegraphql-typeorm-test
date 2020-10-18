import { InputType, Field } from "type-graphql";
import {MaxLength, MinLength} from "class-validator";

@InputType()
export class CreateBookInput {
    @Field(() => String)
    @MinLength(1)
    @MaxLength(255)
    name: string;

    @Field(() => Number)
    pageCount: number;

    @Field(() => Number)
    authorId: number;
}