import { AuthService } from '../services/auth.service';
import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';

import { mockSendVerifyCodeReqDto } from './mocks/auth.sendVerifyCodeDto';
import { mockPhoneVerificationDocument } from './mocks/auth.entity';
import { createTestModule } from './createTestModule';

describe('AuthService', () => {
  let service: AuthService;
  let repo: PhoneVerificationRepository;

  beforeEach(async () => {
    const testModule = await createTestModule();
    service = testModule.service;
    repo = testModule.repo;

    jest.restoreAllMocks();
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
