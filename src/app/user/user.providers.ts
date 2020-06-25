import { UserSchema } from './repositories/mongoose/schemas/user.schema';
import { ModelsEnum } from '../../models/models.enum';
import { UserRepository } from './repositories/mongoose/user.repository';
import { Connection, PaginateModel } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import { TokenService } from '../auth/token/token.service';
import { mongooseConnection } from '../../infrastructure/databases/mongoose/mongoose.provider';
import { ConfirmService } from '../confirm/confirm.service';

export const userProviders = [
  {
    provide: ModelsEnum.USER,
    useFactory: (connection: Connection) =>
      connection.model(ModelsEnum.USER, UserSchema),
    inject: [mongooseConnection],
  },
  {
    provide: UserRepository,
    useFactory: (model: PaginateModel<IUser>) => {
      return new UserRepository(model);
    },
    inject: [ModelsEnum.USER],
  },
  {
    provide: UserService,
    useFactory: (repository, tokenService, confirmService) => {
      return new UserService(repository, tokenService, confirmService);
    },
    inject: [UserRepository, TokenService, ConfirmService],
  },
];
