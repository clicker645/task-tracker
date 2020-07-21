import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestCasbinModule } from 'nestjs-casbin-mongodb';
import { join } from 'path';

import { CasbinController } from './casbin.controller';
import { casbinValidationProviders } from './casbin.providers';
import { UserModule } from '../user/user.module';

const casbinCollection = 'casbinRBAC';

@Module({
  imports: [
    UserModule,
    NestCasbinModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get('MONGODB_CONNECTION_STRING'),
          casbinModelPath: join(__dirname, '../../../rbac_model.conf'),
          databaseName: config.get('MONGODB_DATABASE'),
          collectionName: casbinCollection,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [...casbinValidationProviders],
  controllers: [CasbinController],
})
export class CasbinModule {}
