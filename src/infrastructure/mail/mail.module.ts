import { DynamicModule, Module } from '@nestjs/common';

import { MailService } from './mail.service';
import { configModule } from '../../config/configure.root';
import { MailConfig } from './interfaces/config.interface';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [configModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {
  static forRoot(option?: MailConfig): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: Mail,
          useFactory: config => {
            const transport = {
              service: config.get('MAIL_SERVICE'),
              auth: {
                user: config.get('ADMIN_MAIL'),
                pass: config.get('ADMIN_MAIL_PASSWORD'),
              },
            };

            if (option) {
              option.password ? (transport.auth.pass = option.password) : null;
              option.email ? (transport.auth.user = option.email) : null;
              option.service ? (transport.service = option.service) : null;
            }

            return nodemailer.createTransport(transport);
          },
          inject: [ConfigService],
        },
      ],
      exports: [MailService],
    };
  }
}
