import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../users';

type UserNoPassword = Omit<User, 'password'>;

type SerializerCB = (err: Error, user: any) => void;
type DeserializerCB = (err: Error, payload: UserNoPassword) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: UserNoPassword, done: SerializerCB) {
    done(null, user);
  }
  deserializeUser(payload: UserNoPassword, done: DeserializerCB) {
    done(null, payload);
  }
}
