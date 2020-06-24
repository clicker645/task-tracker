import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ItemType {
  @Field(type => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  expiresAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
