import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { SignInDto } from './dto/signin.dto';
import { Request } from 'express';

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
  async logout(@Req() req: Request) {
    return await this.authService.logout(req);
  }

  @Post('/reset')
  async sendResetLink(@Query('email') email: string) {
    return this.authService.sendResetLink(email);
  }
}
