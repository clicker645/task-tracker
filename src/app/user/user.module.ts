import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenModule } from '../auth/token/token.module';
import { DatabaseModule } from '../../infrastructure/databases/mongoose/mongoose.module';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule, TokenModule],
  providers: [...userProviders],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
