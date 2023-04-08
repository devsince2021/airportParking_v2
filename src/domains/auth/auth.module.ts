import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

import { NaverService } from './services/naver.service';

@Module({
  imports: [CacheModule.register(), HttpModule],
  providers: [AuthService, NaverService],
  controllers: [AuthController],
})
export class AuthModule {}
