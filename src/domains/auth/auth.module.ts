import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { PhoneVerificationRepository } from './repositories/auth.phoneVerification.repository';

import {
  PhoneVerification,
  PhoneVerificationSchema,
} from './entities/phoneVerification';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhoneVerification.name, schema: PhoneVerificationSchema },
    ]),
  ],
  providers: [AuthService, PhoneVerificationRepository],
  controllers: [AuthController],
})
export class AuthModule {}
