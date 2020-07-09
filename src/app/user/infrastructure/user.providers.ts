import { Provider } from '@nestjs/common';
import { Connection, PaginateModel } from 'mongoose';

import { MongooseUserRepository } from './repositories/mognoose.user.repository';
import { User, UserSchema } from '../domain/user.model';
import { mongooseConnection } from '../../../infrastructure/databases/mongoose/mongoose.provider';
import { UserService } from '../application/user.service';

export const userProviders: Provider[] = [
  {
    provide: MongooseUserRepository,
    useFactory: (connection: Connection) => {
      const userModule = connection.model('user', UserSchema);
      return new MongooseUserRepository(userModule as PaginateModel<User>);
    },
    inject: [mongooseConnection],
  },
  {
    provide: UserService,
    useFactory: repository => {
      return new UserService(repository);
    },
    inject: [MongooseUserRepository],
  },
];
