import { User } from '../user/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthEntity {
  @Field()
  expiresIn: number;

  @Field()
  jwt: string;

  @Field(() => User)
  user: User;

  constructor(expiresIn: number, jwt: string, user: User) {
    this.expiresIn = expiresIn;
    this.jwt = jwt;
    this.user = user;
  }
}
