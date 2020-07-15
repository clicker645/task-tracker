import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateShareItemDto } from './dto/create-share-item.dto';
import { ShareService } from './share.service';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('share')
@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async create(
    @CurrentUser() user,
    @Body(new ValidationPipe()) body: CreateShareItemDto,
  ) {
    return this.shareService.create(user, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  async get(
    @CurrentUser() user,
    @Query(new ValidationPipe()) pagination: PaginationOptions,
  ) {
    return this.shareService.getSharedItemByUser(user, pagination);
  }
}
