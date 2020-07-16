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

import { UserService } from './user.service';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { queryValidations } from '../../components/validation/validation.query';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('/search/:data')
  async search(
    @Param('data') data: string,
    @Query(...queryValidations) pagination: PaginationOptions,
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
    @Query(...queryValidations) query: QueryUserDto,
    @Query(...queryValidations) pagination: PaginationOptions,
  ) {
    return this.userService.findAll(query, pagination);
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
    @Body(new ValidationPipe()) payload: UpdateUserDto,
  ) {
    return this.userService.update(id, payload);
  }

  @ApiBearerAuth()
  @Put('/password')
  async changePassword(@Body(new ValidationPipe()) payload: ChangePasswordDto) {
    return this.userService.changePassword(payload);
  }

  @Post('/password/reset')
  async resetPassword(@Body(new ValidationPipe()) payload: ResetPasswordDto) {
    return this.userService.resetPassword(payload);
  }

  @ApiBearerAuth()
  @Post('/')
  async create(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.userService.create(user);
  }
}
