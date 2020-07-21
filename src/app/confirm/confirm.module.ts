import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailModule } from '../../infrastructure/mail/mail.module';
import { ConfirmService } from './confirm.service';
import { BullModule } from '@nestjs/bull';
import { queueMessage } from './confirm.consts';

@Module({
  imports: [
    ConfigModule,
    MailModule.forRoot(),
    BullModule.registerQueueAsync({
      name: queueMessage,
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ConfirmService],
})
export class ConfirmModule {}
