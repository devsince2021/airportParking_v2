import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { AuthService } from '../auth.service';
import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';
import { PhoneVerification } from '../entities/phoneVerification';

import { mockSendVerifyCodeReqDto } from './mocks/auth.sendVerifyCodeDto';
import { mockPhoneVerificationDocument } from './mocks/auth.entity';

describe('AuthService', () => {
  let service: AuthService;
  let repo: PhoneVerificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PhoneVerificationRepository,
        {
          provide: getModelToken(PhoneVerification.name),
          useClass: PhoneVerification,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get<PhoneVerificationRepository>(PhoneVerificationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendVerifyCode', () => {
    describe('when sendVerifyCode is called', () => {
      let response;

      beforeEach(async () => {
        jest.spyOn(service, 'createCode').mockReturnValue('1234');

        jest
          .spyOn(repo, 'upsert')
          .mockResolvedValue(mockPhoneVerificationDocument());

        response = await service.sendVerifyCode(
          mockSendVerifyCodeReqDto().phone,
        );
      });

      it('should return object having "code", "phone" as its property', () => {
        expect(response).toHaveProperty('code');
        expect(response).toHaveProperty('phone');
        expect(response.code).toHaveLength(4);
        expect(response.phone).toEqual(mockSendVerifyCodeReqDto().phone);
      });
    });
  });

  describe('createCode', () => {
    describe('when createCode is called', () => {
      let code;

      beforeEach(() => {
        code = service.createCode();
      });

      it('should return 4-digits random number in string type', () => {
        expect(code).toHaveLength(4);
      });

      it('should always return different string', () => {
        const newCode = service.createCode();
        expect(code).not.toBe(newCode);
      });
    });
  });
});
