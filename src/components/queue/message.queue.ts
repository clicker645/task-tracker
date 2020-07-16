// import { BullModule } from '@nestjs/bull';
// import { ConfigService } from '@nestjs/config';
//
// export const queueMessage = 'confirmMessage';
//
// export const messageQueue = BullModule.registerQueueAsync({
//   name: queueMessage,
//   useFactory: (configService: ConfigService) => ({
//     redis: {
//       host: configService.get('REDIS_HOST'),
//       port: configService.get<number>('REDIS_PORT'),
//     },
//   }),
//   inject: [ConfigService],
// });
