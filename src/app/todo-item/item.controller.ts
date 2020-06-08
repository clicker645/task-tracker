import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/:user_id')
  async getByUser(
    @Headers('authorization') token: string,
    @Param('user_id') userId: string,
    @Query(new ValidationPipe()) pagination: PaginationOptions,
  ) {
    return this.itemService.getByUser(token, userId, pagination);
  }

  @Post('/')
  async create(@Body(new ValidationPipe()) data: CreateItemDto) {
    return this.itemService.create(data);
  }

  @Patch('/:id')
  async update(
    @Headers('authorization') token: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: UpdateItemDto,
  ) {
    return this.itemService.update(token, id, data);
  }

  @Get('/shared/:user_id')
  async getSharedItems(
    @Param('user_id') userId: string,
    @Query() pagination: PaginationOptions,
  ) {
    return this.itemService.getSharedItems(userId, pagination);
  }

  @Get('/history/:id')
  async getHistoryBy(
    @Param('id') id: string,
    @Query() pagination: PaginationOptions,
  ) {
    return this.itemService.getHistoryBy(id, pagination);
  }
}
