import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';
import { PaginateResult } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ActionType, TokenService } from '../auth/token/token.service';
import { UserRepository } from './repositories/mongoose/user.repository';
import { QueryUserDto } from './dto/query-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    private readonly userRepository: UserRepository,
    private tokenService: TokenService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, await bcrypt.genSalt(this.saltRounds));
  }

  async changePassword(payload: ChangePasswordDto): Promise<boolean> {
    const user = await this.userRepository.findById(payload._id);
    bcrypt.compare(payload.oldPassword, user.password, (e, ok) => {
      if (!ok) {
        throw new BadRequestException({
          message: 'Your old password is incorrect',
        });
      }
    });

    const newPassword = await this.hashPassword(payload.newPassword);
    await this.userRepository.update(payload._id, {
      password: newPassword,
    });

    return true;
  }

  async resetPassword(payload: ResetPasswordDto): Promise<boolean> {
    const jwtToken = await this.tokenService.verify(payload.token);
    const newPassword = await this.hashPassword(payload.password);
    await this.userRepository.update(jwtToken._id, {
      password: newPassword,
    });

    return true;
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      createUserDto.password = await this.hashPassword(createUserDto.password);
      const user = await this.userRepository.create(createUserDto);
      await this.tokenService.sendLink(user, ActionType.Confirm);
      return;
    } catch (e) {
      throw new BadRequestException({
        message: 'This email already used',
        reason: e,
      });
    }
  }

  async findById(id: string): Promise<IUser> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userRepository.findByEmail(email);
  }

  async update(_id: string, payload: Partial<IUser>) {
    return await this.userRepository.update(_id, payload);
  }

  async delete(_id: string): Promise<any> {
    return await this.userRepository.delete(_id);
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
    return await this.userRepository.findAll(queryParams, options);
  }
}
