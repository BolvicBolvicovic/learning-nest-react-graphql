import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    role?: string;
}

@InputType()
export class UserInput {
    @Field()
    name: string;

    @Field()
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
}