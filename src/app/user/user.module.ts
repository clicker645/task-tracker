import { Module } from '@nestjs/common';

import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../infrastructure/databases/mongoose/mongoose.module';
import { ConfirmModule } from '../confirm/confirm.module';

@Module({
  imports: [DatabaseModule, ConfirmModule],
  providers: [...userProviders],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
