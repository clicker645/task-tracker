import { Provider } from '@nestjs/common';
import { Connection, PaginateModel } from 'mongoose';

import { MongooseUserRepository } from './repositories/mongoose/mognoose.user.repository';
import { User, UserSchema } from './user.entity';
import { mongooseConnection } from '../../infrastructure/databases/mongoose/mongoose.provider';
import { modelsEnum } from '../../config/config.const';
import { UserService } from './user.service';

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
