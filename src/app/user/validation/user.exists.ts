import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(userId: string) {
    const user = await this.userService.findById(userId);
    return !!user;
  }

  defaultMessage(): string {
    return `Error: user not found`;
  }
}
