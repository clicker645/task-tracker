import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateShareItemDto } from './dto/create-share-item.dto';
import { dictionary } from '../../config/dictionary';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { IShareRepository } from './repositories/share.repository.interface';
import { ShareItem } from './share-item.entity';
import { User } from '../user/user.entity';
import { IPaginate } from '../../infrastructure/databases/mongoose/pagination/pagination.output';

export class ShareService {
  constructor(private readonly shareRepository: IShareRepository) {}

  async create(
    user: User,
    createShareItemDto: CreateShareItemDto,
  ): Promise<ShareItem> {
    if (user._id === createShareItemDto.userId) {
      throw new BadRequestException({
        message: dictionary.errors.shareYourselfError,
      });
    }

    try {
      return await this.shareRepository.create(createShareItemDto as ShareItem);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getSharedItemByUser(
    user: User,
    pagination: PaginationOptions,
  ): Promise<IPaginate<ShareItem>> {
    try {
      return await this.shareRepository.findAll(
        { userId: user._id },
        pagination,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async checkPermission(
    userId: string,
    itemId: string,
    accessType: number,
  ): Promise<boolean> {
    const shareItem = await this.shareRepository.findOne({
      userId,
      itemId,
    });

    if (!shareItem || shareItem.accessType !== accessType) {
      return false;
    }

    return true;
  }
}
