import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { AuthService } from '../services/auth.service';
import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';
import { PhoneVerification } from '../entities/phoneVerification';

import { mockPhoneVerificationDocument } from './mocks/auth.entity';
import { NaverService } from '../services/naver.service';
import { AuthController } from '../controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';

export const createTestModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule, HttpModule],
    controllers: [AuthController],
    providers: [
      AuthService,
      PhoneVerificationRepository,
      NaverService,
      {
        provide: getModelToken(PhoneVerification.name),
        useValue: {
          create: jest.fn().mockResolvedValue(mockPhoneVerificationDocument()),
        },
      },
    ],
  }).compile();

  const controller = module.get<AuthController>(AuthController);
  const service = module.get<AuthService>(AuthService);
  const repo = module.get<PhoneVerificationRepository>(
    PhoneVerificationRepository,
  );

  const schema = module.get(getModelToken(PhoneVerification.name));
  const naverService = module.get<NaverService>(NaverService);

  return { service, repo, schema, controller, naverService };
};
