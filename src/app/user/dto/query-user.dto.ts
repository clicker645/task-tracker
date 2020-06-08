import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryUserDto {
  factory(object: Record<string, any>): QueryUserDto {
    for (const [key, value] of Object.entries(object)) {
      if (key === 'email') {
        this.email = value;
      }
      if (key === 'login') {
        this.login = value;
      }
    }

    return this;
  }

  @ApiPropertyOptional()
  login: string;

  @ApiPropertyOptional()
  email: string;
}
