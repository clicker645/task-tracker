import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ResetPasswordTemplate } from '../../infrastructure/mail/templates/reset-password.template';
import { ConfirmTemplate } from '../../infrastructure/mail/templates/confirm.template';
import { MailService } from '../../infrastructure/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/domain/user.model';

export const MessageType = {
  Reset: {
    subject: 'Reset Password',
    path: `${process.env.PATH_TO_RESET_PASS_PAGE}?token=`,
    html: ResetPasswordTemplate,
  },
  Confirm: {
    subject: 'Verify User',
    path: '/auth/confirm?token=',
    html: ConfirmTemplate,
  },
};

declare type MessageType = {
  subject: string;
  path: string;
  html: (login: string, confirmLink: string) => string;
};

@Injectable()
export class ConfirmService {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async send(user: User, messageType: MessageType): Promise<boolean> {
    let confirmToken = null;

    try {
      confirmToken = 'asd';
    } catch (e) {
      throw new Error(e);
    }

    const confirmLink =
      this.configService.get<string>('FE_APP_URL') +
      messageType.path +
      confirmToken;

    const mailData = {
      from: this.configService.get<string>('ADMIN_MAIL'),
      to: user.email,
      subject: messageType.subject,
      html: messageType.html(user.login, confirmLink),
    };

    try {
      await this.mailService.send(mailData);
    } catch (e) {
      throw new Error(e);
    }

    return true;
  }
}
