import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { IUser } from './interfaces/user.interface';
import { PaginateModel, PaginateResult } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationOptions } from '../../components/pagination/paginate.params';
import { ChangePasswordDto } from './dto/change-password.dto';
import { TokenService } from '../../components/token/token.service';
import * as moment from 'moment';
import { MailService } from '../../components/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel('User') private userModel: PaginateModel<IUser>,
    private tokenService: TokenService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<boolean> {
    const password = await this.hashPassword(changePasswordDto.password);

    await this.update(changePasswordDto._id, { password });
    await this.tokenService.delete(changePasswordDto._id);
    return true;
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel(
      _.assignIn(createUserDto, { password: hash }),
    );

    const user = await createdUser.save();
    await this.sendConfirmation(user);

    return user;
  }

  async sendConfirmation(user: IUser) {
    const expiresIn = 60 * 60 * 24; // 24 hours
    const tokenPayload = {
      _id: user._id,
      status: user.status,
      role: user.role,
    };
    const expireAt = moment()
      .add(1, 'day')
      .toISOString();

    const token = await this.tokenService.generate(tokenPayload, { expiresIn });
    const confirmLink = `${this.configService.get<string>(
      'FE_APP_URL',
    )}/auth/confirm?token=${token}`;

    await this.tokenService.create({ token, uId: user._id, expireAt });
    await this.mailService.send({
      from: this.configService.get<string>('ADMIN_MAIL'),
      to: user.email,
      subject: 'Verify User',
      html: `
                <h3>Hello ${user.login}!</h3>
                <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
            `,
    });

    Logger.log(confirmLink);
  }

  async find(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email });
  }

  async update(_id: string, payload: Partial<IUser>) {
    return this.userModel.updateOne({ _id }, payload);
  }

  async delete(_id: string): Promise<any> {
    return this.userModel.deleteOne({ _id });
  }

  async findAll(options: PaginationOptions): Promise<PaginateResult<IUser>> {
    return await this.userModel.paginate({}, options);
  }
}
