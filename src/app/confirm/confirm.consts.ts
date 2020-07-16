import { ResetPasswordTemplate } from '../../infrastructure/mail/templates/reset-password.template';
import { ConfirmTemplate } from '../../infrastructure/mail/templates/confirm.template';

export const addMessageToQueue = 'addMessageToQueue';
export const queueMessage = 'confirmMessage';

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
