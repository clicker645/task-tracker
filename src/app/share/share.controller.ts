import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateShareItemDto } from './dto/create-share-item.dto';
import { ShareService } from './share.service';
import { Request } from 'express';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';

@ApiBearerAuth()
@ApiTags('share')
@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post('/')
  async create(
    @Req() req: Request,
    @Body(new ValidationPipe()) body: CreateShareItemDto,
  ) {
    return this.shareService.create(req, body);
  }

  @Get('/')
  async get(
    @Req() req: Request,
    @Query(new ValidationPipe()) pagination: PaginationOptions,
  ) {
    return this.shareService.getSharedItemByUser(req, pagination);
  }
}
