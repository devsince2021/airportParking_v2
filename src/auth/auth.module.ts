import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
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
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
