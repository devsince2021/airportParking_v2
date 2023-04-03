import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PhoneVerificationRepository } from './repositories/auth.phoneVerification.repository';

import {
  PhoneVerification,
  PhoneVerificationSchema,
} from './entities/phoneVerification';
import { NaverService } from './services/naver.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhoneVerification.name, schema: PhoneVerificationSchema },
    ]),
    HttpModule,
  ],
  providers: [AuthService, PhoneVerificationRepository, NaverService],
  controllers: [AuthController],
})
export class AuthModule {}
