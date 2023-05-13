import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UsersModule } from '../users';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { NaverService } from './services/naver.service';
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
  controllers: [AuthController],
})
export class AuthModule {}
