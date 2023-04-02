import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { AuthService } from '../services/auth.service';
import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';
import { PhoneVerification } from '../entities/phoneVerification';

import { mockSendVerifyCodeReqDto } from './mocks/auth.sendVerifyCodeDto';
import { mockPhoneVerificationDocument } from './mocks/auth.entity';
import { NaverService } from '../services/naver.service';
import { AuthController } from '../controllers/auth.controller';

export const createTestModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [AuthController],
    providers: [
      AuthService,
      PhoneVerificationRepository,
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
  // const naverService = module.get<NaverService>(NaverService);

  return { service, repo, schema, controller };
};
