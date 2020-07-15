import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';

import { IUserRepository } from './repositories/user-repository.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { saltRounds } from './user.constants';
import { dictionary } from '../../config/dictionary';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { PaginatedType } from '../../infrastructure/databases/mongoose/pagination/pagination.output';
import { QueryUserDto } from './dto/query-user.dto';
import { ConfirmService, MessageType } from '../confirm/confirm.service';

export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly confirmService: ConfirmService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, await bcrypt.genSalt(saltRounds));
  }

  async changePassword(payload: ChangePasswordDto): Promise<boolean> {
    const user = await this.findById(payload._id);
    const passwordsIsCompare = await bcrypt.compare(
      payload.oldPassword,
      user.password,
    );
    if (!passwordsIsCompare) {
      throw new BadRequestException(dictionary.errors.oldPassIncorrect);
    }

    const newPassword = await this.hashPassword(payload.newPassword);
    await this.update(payload._id, {
      password: newPassword,
    });

    return true;
  }

  async resetPassword(payload: ResetPasswordDto): Promise<boolean> {
    // const newPassword = await this.hashPassword(payload.password);

    // try {
    //   await this.userRepository.update(jwtToken._id, {
    //     password: newPassword,
    //   });
    // } catch (e) {
    //   throw new BadRequestException(e);
    // }

    return true;
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    createUserDto.password = await this.hashPassword(createUserDto.password);

    try {
      const user = await this.userRepository.create(createUserDto as User);
      await this.confirmService.send(user, MessageType.Confirm);
    } catch (e) {
      throw new BadRequestException(e);
    }

    return { message: dictionary.notifications.successfullyUserCreate };
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.userRepository.findById(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(_id: string, payload: Partial<User>) {
    try {
      return await this.userRepository.update(_id, payload);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async delete(_id: string): Promise<any> {
    try {
      return await this.userRepository.delete(_id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async search(
    search: string,
    options: PaginationOptions,
  ): Promise<PaginatedType<User>> {
    return await this.userRepository.findAll(
      {
        $or: [
          { email: { $regex: search, $options: 'i' } },
          { login: { $regex: search, $options: 'i' } },
        ],
      },
      options,
    );
  }

  async findAll(
    queryParams: QueryUserDto,
    options: PaginationOptions,
  ): Promise<PaginatedType<User>> {
    try {
      return await this.userRepository.findAll(queryParams, options);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
