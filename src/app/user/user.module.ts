import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './repositories/mongoose/schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenModule } from '../auth/token/token.module';
import { UserRepository } from './repositories/mongoose/user.repository';
import { ModelsEnum } from '../../models/models.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelsEnum.USER, schema: UserSchema }]),
    TokenModule,
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
