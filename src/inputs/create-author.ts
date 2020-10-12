import { InputType, Field } from "type-graphql";

@InputType()
export class CreateAuthorInput {
    @Field(() => String)
    name: string;
}