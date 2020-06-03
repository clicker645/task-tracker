import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';
import { PaginateResult } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/paginate.params';
import { ChangePasswordDto } from './dto/change-password.dto';
import { TokenService } from '../../components/token/token.service';
import { UserRepository } from './repositories/mongoose/user.repository';

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

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<boolean> {
    const password = await this.hashPassword(changePasswordDto.password);

    await this.userRepository.update(changePasswordDto._id, { password });
    await this.tokenService.deleteByUserId(changePasswordDto._id);
    return true;
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      createUserDto.password = await this.hashPassword(createUserDto.password);
      const user = await this.userRepository.create(createUserDto);
      await this.tokenService.sendConfirmation(user);
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

  async findAll(options: PaginationOptions): Promise<PaginateResult<IUser>> {
    return await this.userRepository.findAll({}, options);
  }
}
