import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType()
  abstract class PaginatedType {
    @Field(type => [classRef], { nullable: true })
    docs: T[];

    @Field(type => Int)
    totalDocs: number;

    @Field(type => Int)
    limit: number;

    @Field(type => Int, { nullable: true })
    page?: number;

    @Field(type => Int)
    totalPages: number;

    @Field(type => Int, { nullable: true })
    nextPage?: number;

    @Field(type => Int, { nullable: true })
    prevPage?: number;

    @Field(type => Int)
    pagingCounter: number;

    @Field()
    hasPrevPage: boolean;

    @Field()
    hasNextPage: boolean;
  }

  return PaginatedType;
}
