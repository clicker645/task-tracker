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
import { QueryUserDto } from './dto/query-user.dto';
import { IPaginate } from '../../infrastructure/databases/mongoose/pagination/pagination.output';
import { Queue } from 'bull';
import { addMessageToQueue, MessageType } from '../confirm/confirm.consts';

export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly messageQueue: Queue,
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
    const newPassword = await this.hashPassword(payload.password);

    // TODO
    try {
      await this.userRepository.update('USER_ID', {
        password: newPassword,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }

    return true;
  }

  async findOne(query: QueryUserDto): Promise<User> {
    return this.userRepository.findOne(query);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user = null;
    createUserDto.password = await this.hashPassword(createUserDto.password);

    try {
      user = await this.userRepository.create(createUserDto as User);
      await this.messageQueue.add(addMessageToQueue, {
        user: user,
        messageType: MessageType.Confirm,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }

    return user;
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

  async delete(_id: string): Promise<boolean> {
    try {
      return !!(await this.userRepository.delete(_id));
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async search(
    search: string,
    options: PaginationOptions,
  ): Promise<IPaginate<User>> {
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
  ): Promise<IPaginate<User>> {
    try {
      return await this.userRepository.findAll(queryParams, options);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
