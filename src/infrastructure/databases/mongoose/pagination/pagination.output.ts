import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginate<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page?: number;
  totalPages: number;
  nextPage?: number;
  prevPage?: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export function GqlPaginate<T>(classRef: Type<T>): any {
  @ObjectType()
  abstract class PaginationType implements IPaginate<T> {
    @Field(() => [classRef], { nullable: true })
    docs: T[];

    @Field(() => Int)
    totalDocs: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int, { nullable: true })
    page?: number;

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int, { nullable: true })
    nextPage?: number;

    @Field(() => Int, { nullable: true })
    prevPage?: number;

    @Field(() => Int)
    pagingCounter: number;

    @Field()
    hasPrevPage: boolean;

    @Field()
    hasNextPage: boolean;
  }

  return PaginationType;
}
