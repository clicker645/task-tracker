import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateShareItemDto } from './dto/create-share-item.dto';
import { IShareItem } from './interfaces/share-item.interface';
import { PaginateResult } from 'mongoose';
import { dictionary } from '../../config/dictionary';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { IShareRepository } from './repositories/share.repository.interface';

export class ShareService {
  constructor(private readonly shareRepository: IShareRepository) {}

  async create(
    currentUserId: string,
    createShareItemDto: CreateShareItemDto,
  ): Promise<IShareItem> {
    try {
      if (String(currentUserId) === String(createShareItemDto.userId)) {
        throw new BadRequestException({
          message: dictionary.errors.shareYourselfError,
        });
      }

      return await this.shareRepository.create(createShareItemDto);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getSharedItemByUser(
    currentUserId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IShareItem>> {
    try {
      return await this.shareRepository.findAll(
        { userId: currentUserId },
        pagination,
      );
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
