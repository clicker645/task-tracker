import { Module } from '@nestjs/common';

import { userProviders } from './user.providers';
import { UserService } from '../application/user.service';
import { UserController } from './http/controllers/user.controller';
import { DatabaseModule } from '../../../infrastructure/databases/mongoose/mongoose.module';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
