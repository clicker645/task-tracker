import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateShareItemDto } from './dto/create-share-item.dto';
import { IShareItem } from './interfaces/share-item.interface';
import { PaginateResult } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { dictionary } from '../../config/dictionary';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { IShareRepository } from './repositories/share.repository.interface';

export class ShareService {
  constructor(
    private readonly shareRepository: IShareRepository,
    private readonly authService: AuthService,
  ) {}

  async create(
    req: Request,
    createShareItemDto: CreateShareItemDto,
  ): Promise<IShareItem> {
    try {
      const currentUser = await this.authService.getUserFromAuthorization(req);
      if (String(currentUser._id) === String(createShareItemDto.userId)) {
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
    req: Request,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IShareItem>> {
    try {
      const currentUser = await this.authService.getUserFromAuthorization(req);
      return await this.shareRepository.findAll(
        { userId: currentUser._id },
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
