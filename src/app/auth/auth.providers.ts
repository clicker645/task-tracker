import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from './token/token.service';
import { ConfirmService } from '../confirm/confirm.service';

export const authProviders = [
  {
    provide: AuthService,
    useFactory: (userService, tokenService, confirmService) => {
      return new AuthService(userService, tokenService, confirmService);
    },
    inject: [UserService, TokenService, ConfirmService],
  },
];
