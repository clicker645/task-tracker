import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const mongooseConnection = 'DATABASE_CONNECTION';

export const databaseProviders = [
  {
    provide: mongooseConnection,
    useFactory: (config: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(config.get<string>('MONGODB_CONNECTION_STRING')),
    inject: [ConfigService],
  },
];
