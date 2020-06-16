import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { SignInDto } from './dto/signin.dto';
import { VerifyToken } from './token/decorators/verify-token.decorator';
import { ITokenPayload } from './token/interfaces/token-payload.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/confirm')
  async confirm(
    @Query(new ValidationPipe()) query: ConfirmAccountDto,
  ): Promise<boolean> {
    await this.authService.confirm(query.token);
    return true;
  }

  @Post('/login')
  async login(@Body(new ValidationPipe()) signInDto: SignInDto) {
    return await this.authService.login(signInDto);
  }

  @ApiBearerAuth()
  @Post('/logout')
  async logout(@VerifyToken() userToken: ITokenPayload) {
    return await this.authService.logout(userToken._id);
  }

  @Post('/reset')
  async sendResetLink(@Query('email') email: string) {
    return this.authService.sendResetLink(email);
  }
}
