import { Module } from '@nestjs/common';

import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../infrastructure/databases/mongoose/mongoose.module';
import { ConfirmModule } from '../confirm/confirm.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [DatabaseModule, ConfirmModule],
  providers: [...userProviders, UserResolver],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
