import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  async get(
    @Req() req: Request,
    @Query(new ValidationPipe()) pagination: PaginationOptions,
  ) {
    return this.itemService.getByUser(req, pagination);
  }

  @Post('/')
  async create(
    @Req() req: Request,
    @Body(new ValidationPipe()) data: CreateItemDto,
  ) {
    return this.itemService.create(req, data);
  }

  @Patch('/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: UpdateItemDto,
  ) {
    return this.itemService.update(req, id, data);
  }

  @Get('/shared')
  async getSharedItems(
    @Req() req: Request,
    @Query() pagination: PaginationOptions,
  ) {
    return this.itemService.getSharedItems(req, pagination);
  }

  @Get('/history/:id')
  async getHistoryBy(
    @Param('id') id: string,
    @Query() pagination: PaginationOptions,
  ) {
    return this.itemService.getHistoryBy(id, pagination);
  }

  @Delete('/:id')
  delete(@Req() req: Request, @Param('id') id: string) {
    return this.itemService.delete(req, id);
  }
}
