import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Pet {

    @Field(type => Int)
    id: number;

    @Field()
    name: string;
    
    @Field({ nullable: true })
    type?: string;
}

@InputType()
export class PetInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    type?: string;
}