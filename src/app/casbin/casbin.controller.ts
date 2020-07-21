import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { NestCasbinService } from 'nestjs-casbin-mongodb';
import { ApiTags } from '@nestjs/swagger';

import { AddPermissionDto } from './dto/add.permission';
import { AddPermissionsToRoleDto } from './dto/add.permissions-to-role';
import { AddRolesToUserDto } from './dto/add.roles-to-user';

@Injectable()
@ApiTags('casbin')
@Controller('casbin')
export class CasbinController {
  constructor(private readonly casbinService: NestCasbinService) {}

  @Post('/attach/roles')
  async attachRolesToUser(@Body(new ValidationPipe()) dto: AddRolesToUserDto) {
    dto.roles.forEach(role => {
      this.casbinService.addRoleForUser(dto.user, role);
    });
  }

  @Post('/attach/permissions')
  async attachPermissionsToRole(
    @Body(new ValidationPipe()) dto: AddPermissionsToRoleDto,
  ) {
    dto.permission.forEach(permission => {
      this.casbinService.enforcer.addGroupingPolicy(dto.role, permission);
    });
  }

  @Post('/permission')
  async addPermissions(@Body(new ValidationPipe()) dto: AddPermissionDto) {
    return this.casbinService.addPolicy(dto.permission, dto.path, dto.methods);
  }

  @Get('/permission/:user')
  async getPermissionForUser(@Param('user') user: string) {
    return this.casbinService.getPermissionsForUser(user);
  }

  @Get('/roles/:user')
  async getRolesForUser(@Param('user') user: string) {
    return this.casbinService.enforcer.getRolesForUser(user);
  }

  @Get('/permissions')
  async getPermissions() {
    return this.casbinService.getAllSubjects();
  }
}
