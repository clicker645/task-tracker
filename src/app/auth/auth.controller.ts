import { LoginDto } from './dto/login.dto';
import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from './guards/jwt.guard';
import { CurrentUser } from './decorators/user.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(new ValidationPipe()) req: LoginDto): Promise<any> {
    return this.authService.login(req);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@CurrentUser() user): Promise<any> {
    return user;
  }
}
