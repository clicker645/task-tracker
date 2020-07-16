import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../../infrastructure/mail/mail.service';
import { User } from '../user/user.entity';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { addMessageToQueue, queueMessage } from './confirm.consts';

declare type MessageType = {
  subject: string;
  path: string;
  html: (login: string, confirmLink: string) => string;
};

@Injectable()
@Processor(queueMessage)
export class ConfirmService {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @Process(addMessageToQueue)
  async send(job: Job<{ user: User; messageType: MessageType }>) {
    console.log(job.data);
    console.log(job);
    // // TODO
    // const confirmToken = 'TODO';
    //
    // const confirmLink =
    //   this.configService.get('FE_APP_URL') +
    //   job.data.messageType.path +
    //   confirmToken;
    //
    // const mailData = {
    //   from: this.configService.get('ADMIN_MAIL'),
    //   to: job.data.user.email,
    //   subject: job.data.messageType.subject,
    //   html: job.data.messageType.html(job.data.user.login, confirmLink),
    // };
    //
    // try {
    //   await this.mailService.send(mailData);
    // } catch (e) {
    //   throw new Error(e);
    // }

    return true;
  }
}
