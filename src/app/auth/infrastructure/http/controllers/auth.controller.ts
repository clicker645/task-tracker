import { LoginRequest } from './../../requests/login.request';
import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { AuthService } from 'src/app/auth/application/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  async login(@Body() req: LoginRequest): Promise<any> {
    return this.authService.login(req);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('me')
  async getLoggedInUser(@Request() request): Promise<any> {
    return request.user;
  }
}
