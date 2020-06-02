import { BadRequestException, Injectable } from '@nestjs/common';
import { ShareRepository } from './repositories/mongoose/share.repository';
import { CreateShareItemDto } from './dto/create-share-item.dto';
import { IShareItem } from './interfaces/share-item.interface';
import { PaginateResult } from 'mongoose';

@Injectable()
export class ShareService {
  constructor(private readonly shareRepository: ShareRepository) {}

  async create(createShareItemDto: CreateShareItemDto): Promise<IShareItem> {
    try {
      return await this.shareRepository.create(createShareItemDto);
    } catch (e) {
      throw new BadRequestException({
        message: 'The item already shared to this user.',
        reason: e,
      });
    }
  }

  async getSharedItemByUser(
    userId: string,
  ): Promise<PaginateResult<IShareItem>> {
    return await this.shareRepository.findAll({ userId }, {});
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

    if (shareItem.accessType !== access) {
      return false;
    }

    return true;
  }
}
