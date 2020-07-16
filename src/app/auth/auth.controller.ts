import { LoginDto } from './dto/login.dto';
import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from 'src/app/auth/auth.service';
import { CurrentUser } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() req: LoginDto): Promise<any> {
    return this.authService.login(req);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@CurrentUser() user): Promise<any> {
    return user;
  }
}
