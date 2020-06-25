import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';
import { PaginateResult } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { ChangePasswordDto } from './dto/change-password.dto';
import { TokenService } from '../auth/token/token.service';
import { QueryUserDto } from './dto/query-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request } from 'express';
import { dictionary } from '../../config/dictionary';
import { IUserRepository } from './repositories/user.repository.interface';
import { saltRounds } from './user.constants';
import { ConfirmService, MessageType } from '../confirm/confirm.service';

export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: TokenService,
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
    const jwtToken = await this.tokenService.verify(payload.token);
    const newPassword = await this.hashPassword(payload.password);

    try {
      await this.userRepository.update(jwtToken._id, {
        password: newPassword,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }

    return true;
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    let user = null;
    createUserDto.password = await this.hashPassword(createUserDto.password);

    try {
      user = await this.userRepository.create(createUserDto);
      await this.confirmService.send(user, MessageType.Confirm);
    } catch (e) {
      throw new BadRequestException(e);
    }

    return { message: dictionary.notifications.successfullyUserCreate };
  }

  async getCurrent(req: Request): Promise<IUser> {
    const currentUser = await this.tokenService.verify(
      req.headers.authorization,
    );
    return this.userRepository.findById(currentUser._id);
  }

  async findById(id: string): Promise<IUser> {
    try {
      return await this.userRepository.findById(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findByEmail(email: string): Promise<IUser> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(_id: string, payload: Partial<IUser>) {
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
  ): Promise<PaginateResult<IUser>> {
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
  ): Promise<PaginateResult<IUser>> {
    try {
      return await this.userRepository.findAll(queryParams, options);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
