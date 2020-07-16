import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthEntity } from './auth.entity';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { GqlAuthGuard } from './guards/gql.auth.guard';
import { UseGuards } from '@nestjs/common';
import { GqlCurrentUser } from './decorators/user.decorator';

@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthEntity)
  async login(@Args() dto: LoginDto): Promise<AuthEntity> {
    return this.authService.login(dto);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@GqlCurrentUser() user): Promise<User> {
    return user;
  }
}
