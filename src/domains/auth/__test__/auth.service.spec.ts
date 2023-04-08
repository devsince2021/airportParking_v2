import { AuthService } from '../services/auth.service';
import { NaverService } from '../services/naver.service';

import { mockSendVerifyCodeReqDto } from './mocks/auth.sendVerifyCodeDto';
import { mockPhoneVerificationDocument } from './mocks/auth.entity';
import { createTestModule } from './createTestModule';
import { mockVerifyCodeReqDto } from './mocks/auth.verifyCodeDto';

describe('AuthService', () => {
  let service: AuthService;
  let naverService: NaverService;
  let cache;

  beforeEach(async () => {
    const testModule = await createTestModule();
    service = testModule.service;
    naverService = testModule.naverService;
    cache = testModule.cache;

    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendVerifyCode', () => {
    describe('when sendVerifyCode is called', () => {
      let document;
      let phone;

      beforeEach(async () => {
        document = mockPhoneVerificationDocument();
        phone = mockSendVerifyCodeReqDto().phone;

        jest.spyOn(service, 'createCode').mockReturnValue('1234');
      });

      it('should return true when it success', async () => {
        jest.spyOn(naverService, 'requestSMS').mockResolvedValue(true);
        const response = await service.sendVerifyCode(phone);
        expect(response).toBe(true);
      });

      it('should return false when requestSMS fail', async () => {
        jest.spyOn(naverService, 'requestSMS').mockRejectedValue(false);
        const response = await service.sendVerifyCode(phone);
        expect(response).toBe(false);
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

  describe('verifyCode', () => {
    describe('when verifyCode is called', () => {
      let document;

      beforeEach(async () => {
        document = mockPhoneVerificationDocument();
      });

      it('should return true when record is valid', async () => {
        jest.spyOn(cache, 'get').mockResolvedValue(mockVerifyCodeReqDto().code);
        const response = await service.verifyCode(mockVerifyCodeReqDto());
        expect(response).toBe(true);
      });

      it('should return false when record is invalid', async () => {
        jest.spyOn(cache, 'get').mockResolvedValue(undefined);
        const response = await service.verifyCode(mockVerifyCodeReqDto());
        expect(response).toBe(false);
      });
    });
  });
});
