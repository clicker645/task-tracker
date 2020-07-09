import { TokenRequest } from './../infrastructure/requests/token.request';
import { LoginRequest } from './../infrastructure/requests/login.request';
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { IAuthUserService } from '../infrastructure/user/auth.user-service';
import { ITokenStorage } from '../domain/token/token.storage';
import { dictionary } from 'src/config/dictionary';
import { LoginResponse } from '../infrastructure/responses/login.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenStorage: ITokenStorage,
    private readonly authUserService: IAuthUserService,
    private readonly configService: ConfigService,
  ) {}

  async login(payload: LoginRequest) {
    const user = await this.authUserService.findByEmail(payload.email);
    if (!user) {
      throw new BadRequestException(dictionary.errors.userNotFound);
    }

    const isCompare = await bcrypt.compare(payload.password, user.password);
    if (!isCompare) {
      throw new BadRequestException(dictionary.errors.passwordMatchError);
    }

    const jwtToken = this.jwtService.sign({
      id: user.id,
      role: user.role,
      email: user.email,
    } as TokenRequest);

    const expiresIn = this.configService.get<number>('JWT_TOKEN_LIFETIME');

    const response = new LoginResponse(expiresIn, jwtToken, user);
    await this.tokenStorage.set(user.id, response, expiresIn);

    return response;
  }
}
