import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserToken } from './interfaces/user-token.interface';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { ITokenPayload } from '../../app/auth/interfaces/token-payload.interface';
import { SignOptions } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<IUserToken>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
    const userToken = new this.tokenModel(createUserTokenDto);
    return await userToken.save();
  }

  async generate(data: ITokenPayload, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  async delete(uId: string): Promise<{ ok?: number; n?: number }> {
    return this.tokenModel.deleteOne({ uId });
  }

  async exists(uId: string, token: string): Promise<boolean> {
    return await this.tokenModel.exists({ uId, token });
  }

  public async verify(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token) as ITokenPayload;
      const tokenExists = await this.exists(data._id, token);

      if (tokenExists) {
        return data;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
