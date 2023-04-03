import { AuthService } from '../services/auth.service';
import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';
import { NaverService } from '../services/naver.service';

import { mockSendVerifyCodeReqDto } from './mocks/auth.sendVerifyCodeDto';
import { mockPhoneVerificationDocument } from './mocks/auth.entity';
import { createTestModule } from './createTestModule';
import { mockVerifyCodeReqDto } from './mocks/auth.verifyCodeDto';

describe('AuthService', () => {
  let service: AuthService;
  let repo: PhoneVerificationRepository;
  let naverService: NaverService;

  beforeEach(async () => {
    const testModule = await createTestModule();
    service = testModule.service;
    repo = testModule.repo;
    naverService = testModule.naverService;

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
        jest.spyOn(repo, 'upsert').mockResolvedValue(document);
        jest.spyOn(naverService, 'requestSMS').mockResolvedValue(true);

        const response = await service.sendVerifyCode(phone);
        expect(response).toBe(true);
      });

      it('should return false when upsert fail', async () => {
        jest.spyOn(repo, 'upsert').mockRejectedValue(document);
        jest.spyOn(naverService, 'requestSMS').mockRejectedValue(false);
        const response = await service.sendVerifyCode(phone);
        expect(response).toBe(false);
      });

      it('should return false when requestSMS fail', async () => {
        jest.spyOn(repo, 'upsert').mockResolvedValue(document);
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
        jest.spyOn(service, 'checkIsValid').mockReturnValue(true);
      });

      it('should return true when record is valid', async () => {
        jest.spyOn(repo, 'findOne').mockResolvedValue(document);
        jest.spyOn(service, 'checkIsValid').mockReturnValue(true);
        const response = await service.verifyCode(mockVerifyCodeReqDto());
        expect(response).toBe(true);
      });

      it('should return false when record is invalid', async () => {
        jest.spyOn(repo, 'findOne').mockResolvedValue(document);
        jest.spyOn(service, 'checkIsValid').mockReturnValue(false);
        const response = await service.verifyCode(mockVerifyCodeReqDto());
        expect(response).toBe(false);
      });

      it('should return false when findOne fail', async () => {
        jest.spyOn(repo, 'findOne').mockResolvedValue(null);
        const response = await service.verifyCode(mockVerifyCodeReqDto());
        expect(response).toBe(false);
      });
    });
  });

  describe('validateCode', () => {
    describe('when createCode is called', () => {
      it('should return false when code is different', () => {
        const mockDocument = {
          phone: '01011111111',
          code: '0000',
          updatedAt: {
            getTime: jest.fn().mockReturnValue(Date.now()),
          },
        } as any;

        const mockDto = {
          ...mockVerifyCodeReqDto(),
          phone: '01011111111',
          code: '1111',
        };

        const res = service.checkIsValid(mockDto, mockDocument);
        expect(res).toBe(false);
      });

      it('should return false if record updated earlier than 3 minutes', () => {
        const FOUR_MINUTE = 4 * 60 * 1000;
        const mockDocument = {
          ...mockPhoneVerificationDocument(),

          updatedAt: {
            getTime: jest.fn().mockReturnValue(Date.now() + FOUR_MINUTE),
          },
        } as any;

        const res = service.checkIsValid(mockVerifyCodeReqDto(), mockDocument);

        expect(res).toBe(false);
      });
    });
  });
});
