import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';

import { IUserRepository } from '../domain/user.repository';
import { ChangePasswordRequest } from '../infrastructure/requests/change-password.request';
import { saltRounds } from '../infrastructure/user.constants';
import { dictionary } from '../../../config/dictionary';
import { ResetPasswordRequest } from '../infrastructure/requests/reset-password.request';
import { CreateUserRequest } from '../infrastructure/requests/create-user.request';
import { User } from '../domain/user.model';
import { PaginationOptions } from '../../../infrastructure/databases/mongoose/pagination/paginate.params';
import { PaginatedType } from '../../../infrastructure/databases/mongoose/pagination/pagination.output';
import { QueryUserReqeust } from '../infrastructure/requests/query-user.request';

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, await bcrypt.genSalt(saltRounds));
  }

  async changePassword(payload: ChangePasswordRequest): Promise<boolean> {
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

  async resetPassword(payload: ResetPasswordRequest): Promise<boolean> {
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

  async create(createUserDto: CreateUserRequest): Promise<any> {
    let user = null;
    createUserDto.password = await this.hashPassword(createUserDto.password);

    try {
      user = await this.userRepository.create(createUserDto as User);
      //await this.confirmService.send(user, MessageType.Confirm);
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
    queryParams: QueryUserReqeust,
    options: PaginationOptions,
  ): Promise<PaginatedType<User>> {
    try {
      return await this.userRepository.findAll(queryParams, options);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
