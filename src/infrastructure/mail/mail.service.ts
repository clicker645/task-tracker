import { Injectable } from '@nestjs/common';
import { IMailGunData } from './interfaces/mail.interface';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailTransport: Mail) {}

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
