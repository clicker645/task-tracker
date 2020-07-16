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

  return PaginationType;
}
