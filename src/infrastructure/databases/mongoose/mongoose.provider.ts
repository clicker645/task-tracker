import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const mongooseConnection = 'DATABASE_CONNECTION';

export const databaseProviders = [
  {
    provide: mongooseConnection,
    useFactory: (config: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(config.get('MONGODB_CONNECTION_STRING')),
    inject: [ConfigService],
  },
];
