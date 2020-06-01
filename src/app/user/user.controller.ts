import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOptions } from '../../components/pagination/paginate.params';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('/')
  async getAll(@Query(new ValidationPipe()) query: PaginationOptions) {
    return this.userService.findAll(query);
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

  @Post()
  async create(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.userService.create(user);
  }
}
