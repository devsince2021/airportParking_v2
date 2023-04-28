import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UsersModule } from '../users';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

import { NaverService } from './services/naver.service';
import { AuthViewController } from './controllers/auth.viewController';
import { LocalStrategy } from './services/passport.localStrategy';
import { SessionSerializer } from './services/passport.sessionSerializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CacheModule.register(),
    PassportModule.register({ session: true }),
    HttpModule,
    UsersModule,
  ],
  providers: [AuthService, NaverService, LocalStrategy, SessionSerializer],
  controllers: [AuthController, AuthViewController],
})
export class AuthModule {}
