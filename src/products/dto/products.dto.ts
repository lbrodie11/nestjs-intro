import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;
  @Field()
  readonly title: string;
  @Field()
  readonly description: string;
  @Field()
  readonly price: number;
}