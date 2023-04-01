import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { SendVerifyCodeResDto } from '../dtos/auth.sendVerifyCodeDto';
import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';
import { PhoneVerification } from '../entities/phoneVerification';

import { mockPhoneVerificationDocument } from './mocks/auth.entity';
import {
  mockSendVerifyCodeReqDto,
  mockSendVerifyCodeResDto,
} from './mocks/auth.sendVerifyCodeDto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let repo: PhoneVerificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        PhoneVerificationRepository,
        {
          provide: getModelToken(PhoneVerification.name),
          useClass: PhoneVerification,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    repo = module.get<PhoneVerificationRepository>(PhoneVerificationRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendVerifyCode', () => {
    describe('when sendVerifyCode is called', () => {
      let response: SendVerifyCodeResDto;

      beforeEach(async () => {
        jest
          .spyOn(repo, 'upsert')
          .mockResolvedValue(mockPhoneVerificationDocument());

        jest
          .spyOn(service, 'sendVerifyCode')
          .mockResolvedValue(mockSendVerifyCodeResDto());

        response = await controller.sendVerifyCode(
          mockSendVerifyCodeReqDto().phone,
        );
      });

      it('should call authService', () => {
        expect(service.sendVerifyCode).toBeCalledWith(
          mockSendVerifyCodeReqDto().phone,
        );
      });

      it('should return sendVerifyCodeResDto', () => {
        expect(response).toEqual(mockSendVerifyCodeResDto());
      });
    });
  });
});
