import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ItemService } from './item.service';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  async get(
    @CurrentUser() user,
    @Query(new ValidationPipe()) pagination: PaginationOptions,
  ) {
    return this.itemService.getByUser(user, pagination);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async create(
    @CurrentUser() user,
    @Body(new ValidationPipe()) data: CreateItemDto,
  ) {
    return this.itemService.create(user, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  async update(
    @CurrentUser() user,
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: UpdateItemDto,
  ) {
    return this.itemService.update(user, id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/shared')
  async getSharedItems(
    @CurrentUser() user,
    @Query() pagination: PaginationOptions,
  ) {
    return this.itemService.getSharedItems(user, pagination);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  delete(@CurrentUser() user, @Param('id') id: string) {
    return this.itemService.delete(user, id);
  }
}
