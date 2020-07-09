import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from '../../../application/user.service';
import { PaginationOptions } from '../../../../../infrastructure/databases/mongoose/pagination/paginate.params';
import { QueryUserReqeust } from '../../requests/query-user.request';
import { UpdateUserRequest } from '../../requests/update-user.request';
import { ChangePasswordRequest } from '../../requests/change-password.request';
import { ResetPasswordRequest } from '../../requests/reset-password.request';
import { CreateUserRequest } from '../../requests/create-user.request';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('hello')
  async hello() {
    return 'Hello world!!';
  }

  @ApiBearerAuth()
  @Get('/search/:data')
  async search(
    @Param('data') data: string,
    @Query(new ValidationPipe()) pagination: PaginationOptions,
  ) {
    return this.userService.search(data, pagination);
  }

  @ApiBearerAuth()
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiBearerAuth()
  @Get('/')
  async getAll(
    @Query() query: QueryUserReqeust,
    @Query(new ValidationPipe()) pagination: PaginationOptions,
  ) {
    return this.userService.findAll(
      new QueryUserReqeust().factory(query),
      pagination,
    );
  }

  @ApiBearerAuth()
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @ApiBearerAuth()
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) payload: UpdateUserRequest,
  ) {
    return this.userService.update(id, payload);
  }

  @ApiBearerAuth()
  @Put('/password')
  async changePassword(
    @Body(new ValidationPipe()) payload: ChangePasswordRequest,
  ) {
    return this.userService.changePassword(payload);
  }

  @Post('/password/reset')
  async resetPassword(
    @Body(new ValidationPipe()) payload: ResetPasswordRequest,
  ) {
    return this.userService.resetPassword(payload);
  }

  @ApiBearerAuth()
  @Post('/')
  async create(@Body(new ValidationPipe()) user: CreateUserRequest) {
    return this.userService.create(user);
  }
}
