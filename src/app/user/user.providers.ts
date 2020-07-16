import { Provider } from '@nestjs/common';
import { Connection, PaginateModel } from 'mongoose';

import { MongooseUserRepository } from './repositories/mongoose/mognoose.user.repository';
import { User, UserSchema } from './user.entity';
import { mongooseConnection } from '../../infrastructure/databases/mongoose/mongoose.provider';
import { modelsEnum } from '../../models/models.enum';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

export const userProviders: Provider[] = [
  {
    provide: MongooseUserRepository,
    useFactory: (connection: Connection) => {
      const userModel = connection.model(modelsEnum.USER, UserSchema);
      return new MongooseUserRepository(userModel as PaginateModel<User>);
    },
    inject: [mongooseConnection],
  },
  {
    provide: UserService,
    useFactory: (repository, queue) => {
      return new UserService(repository, queue);
    },
    inject: [MongooseUserRepository],
  },
];
