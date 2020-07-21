import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { ITokenStorage } from './interfaces/token.storage';
import { UserService } from '../user/user.service';
import { TokenDto } from './dto/token.dto';
import { AuthEntity } from './auth.entity';
import { dictionary } from '../../config/dictionary';
import { JwtFromRequestFunction } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenStorage: ITokenStorage,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async login(payload: LoginDto) {
    const user = await this.userService.findByEmail(payload.email);
    const isCompare = await bcrypt.compare(payload.password, user.password);
    if (!isCompare) {
      throw new BadRequestException(dictionary.errors.passwordMatchError);
    }

    const jwtToken = this.jwtService.sign({
      id: user.id,
      role: user.role,
      email: user.email,
    } as TokenDto);

    const expiresIn = this.configService.get<number>('JWT_TOKEN_LIFETIME');

    const response = new AuthEntity(expiresIn, jwtToken, user);
    await this.tokenStorage.set(user.id, response, expiresIn);

    return response;
  }

  async verify(
    extractor: JwtFromRequestFunction,
    req: Request,
  ): Promise<TokenDto> {
    const token = extractor(req);
    if (!token) {
      throw new UnauthorizedException();
    }

    return this.jwtService.verifyAsync(token);
  }
}
