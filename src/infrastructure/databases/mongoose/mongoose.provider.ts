import * as mongoose from 'mongoose';

export const mongooseConnection = 'DATABASE_CONNECTION';

export const databaseProviders = [
  {
    provide: mongooseConnection,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGODB_CONNECTION_STRING),
  },
];
