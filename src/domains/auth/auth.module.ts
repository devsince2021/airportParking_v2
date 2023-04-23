import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

import { NaverService } from './services/naver.service';
import { AuthViewController } from './controllers/auth.viewController';

@Module({
  imports: [CacheModule.register(), HttpModule],
  providers: [AuthService, NaverService],
  controllers: [AuthController, AuthViewController],
})
export class AuthModule {}
