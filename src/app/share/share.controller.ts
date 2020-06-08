import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateShareItemDto } from './dto/create-share-item.dto';
import { ShareService } from './share.service';

@ApiTags('share')
@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post('/')
  async create(
    @Headers('authorization') token: string,
    @Body(new ValidationPipe()) body: CreateShareItemDto,
  ) {
    return this.shareService.create(token, body);
  }

  @Get('/:user_id')
  async getByUser(@Param('user_id') userId: string) {
    return this.shareService.getSharedItemByUser(userId);
  }
}
