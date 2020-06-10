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
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('/')
  async getAll(
    @Query() query: QueryUserDto,
    @Query(new ValidationPipe()) pagination: PaginationOptions,
  ) {
    return this.userService.findAll(
      new QueryUserDto().factory(query),
      pagination,
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) payload: UpdateUserDto,
  ) {
    return this.userService.update(id, payload);
  }

  @Put('/password')
  async changePassword(@Body(new ValidationPipe()) payload: ChangePasswordDto) {
    return this.userService.changePassword(payload);
  }

  @Post('/password/reset')
  async resetPassword(@Body(new ValidationPipe()) payload: ResetPasswordDto) {
    return this.userService.resetPassword(payload);
  }

  @Post('/')
  async create(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get('/search/:data')
  async search(
    @Param('data') data: string,
    @Query(new ValidationPipe()) pagination: PaginationOptions,
  ) {
    return this.userService.search(data, pagination);
  }
}
