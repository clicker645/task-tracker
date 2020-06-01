import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenModule } from '../../components/token/token.module';
import { UserRepository } from './repositories/mongoose/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    TokenModule,
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
