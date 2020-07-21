import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class AddPermissionDto {
  /**
   * Permission is permission name in database.
   * Name must be correct because
   * it uses when attach permission to role or user
   * @type {string}
   */
  @ApiProperty()
  @IsNotEmpty()
  permission: string;

  /**
   * for example: '/api/users' or '/api/user*', or '/api/user/*'
   * @type {string}
   */
  @ApiProperty()
  @IsNotEmpty()
  path: string;

  /**
   * method must be in next format: '(GET)' or '(GET)|(POST)'.
   * If you want to use all HTTP methods you can just set - '*'
   * @type {string}
   */
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/\((GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE)\)/)
  methods: string;
}
