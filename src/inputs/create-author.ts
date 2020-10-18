import { InputType, Field } from "type-graphql";
import {MaxLength, MinLength} from "class-validator";

@InputType()
export class CreateAuthorInput {
    @Field(() => String)
    @MinLength(1)
    @MaxLength(50)
    name: string;
}