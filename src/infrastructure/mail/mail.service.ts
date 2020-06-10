import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMailGunData } from './interfaces/mail.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private mailTransport;

  constructor(private readonly configService: ConfigService) {
    this.mailTransport = nodemailer.createTransport({
      service: configService.get<string>('MAIL_SERVICE'),
      auth: {
        user: configService.get<string>('ADMIN_MAIL'),
        pass: configService.get<string>('ADMIN_MAIL_PASSWORD'),
      },
    });
  }

  send(data: IMailGunData) {
    this.mailTransport.sendMail(
      {
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.html,
      },
      (error, info) => {
        console.log(error, info);
      },
    );
  }
}
