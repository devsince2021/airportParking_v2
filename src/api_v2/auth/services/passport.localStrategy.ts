import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { User } from '../../users';
import { AuthService } from '../auth.service';

type UserNoPassword = Omit<User, 'password'>;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'userId' });
  }

  async validate(userId: string, password: string): Promise<UserNoPassword> {
    const user = await this.authService.validateLocalLogin(userId, password);
    return user;
  }
}
