import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateShareItemDto } from './dto/create-share-item.dto';
import { ShareService } from './share.service';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { VerifyToken } from '../auth/token/decorators/verify-token.decorator';
import { ITokenPayload } from '../auth/token/interfaces/token-payload.interface';

@ApiBearerAuth()
@ApiTags('share')
@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post('/')
  async create(
    @VerifyToken() tokenUser: ITokenPayload,
    @Body(new ValidationPipe()) body: CreateShareItemDto,
  ) {
    return this.shareService.create(tokenUser._id, body);
  }

  @Get('/')
  async get(
    @VerifyToken() tokenUser: ITokenPayload,
    @Query(new ValidationPipe()) pagination: PaginationOptions,
  ) {
    return this.shareService.getSharedItemByUser(tokenUser._id, pagination);
  }
}
