import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @Get('/')
  async getAll() {
    return this.userService.getAll();
  }
}
