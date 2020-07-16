import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginateUser, User } from './user.entity';
import { UserService } from './user.service';
import { QueryUserDto } from './dto/query-user.dto';
import { IPaginate } from '../../infrastructure/databases/mongoose/pagination/pagination.output';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { queryValidations } from '../../components/validation/validation.query';
import { ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async findOneUser(@Args() query: QueryUserDto): Promise<User> {
    return this.userService.findOne(query);
  }

  @Query(() => PaginateUser)
  async findAllUsers(
    @Args(...queryValidations) query: QueryUserDto,
    @Args(...queryValidations) pagination: PaginationOptions,
  ): Promise<IPaginate<User>> {
    return this.userService.findAll(query, pagination);
  }

  @Mutation(() => User)
  async createUser(
    @Args('userInputCreate', new ValidationPipe()) dto: CreateUserDto,
  ) {
    return this.userService.create(dto);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id') id: string,
    @Args('userInputUpdate', new ValidationPipe()) payload: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, payload);
  }

  @Query(() => PaginateUser)
  searchUser(
    @Args('q') q: string,
    @Args(...queryValidations) pagination: PaginationOptions,
  ): Promise<PaginateUser> {
    return this.userService.search(q, pagination);
  }

  @Mutation(() => Boolean)
  changePassword(
    @Args('userInputChangePass', new ValidationPipe()) dto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.userService.changePassword(dto);
  }

  @Mutation(() => Boolean)
  resetPassword(
    @Args('userInputResetPass', new ValidationPipe()) dto: ResetPasswordDto,
  ): Promise<boolean> {
    return this.userService.resetPassword(dto);
  }
}
