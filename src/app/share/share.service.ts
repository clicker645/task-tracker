import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ShareRepository } from './repositories/mongoose/share.repository';
import { CreateShareItemDto } from './dto/create-share-item.dto';
import { IShareItem } from './interfaces/share-item.interface';
import { PaginateResult } from 'mongoose';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ShareService {
  constructor(
    private readonly shareRepository: ShareRepository,
    private readonly authService: AuthService,
  ) {}

  async create(
    token: string,
    createShareItemDto: CreateShareItemDto,
  ): Promise<IShareItem> {
    try {
      const currentUser = await this.authService.getCurrentUser(token);
      if (String(currentUser._id) === String(createShareItemDto.userId)) {
        throw new BadRequestException("You can't share todo-item for yourself");
      }

      return await this.shareRepository.create(createShareItemDto);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getSharedItemByUser(
    userId: string,
  ): Promise<PaginateResult<IShareItem>> {
    try {
      return await this.shareRepository.findAll({ userId }, {});
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async checkPermission(
    userId: string,
    itemId: string,
    access: number,
  ): Promise<boolean> {
    const shareItem = await this.shareRepository.findOne({
      userId,
      itemId,
    });

    if (!shareItem || shareItem.accessType !== access) {
      return false;
    }

    return true;
  }
}
