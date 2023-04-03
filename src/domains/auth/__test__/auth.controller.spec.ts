import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { ISendVerifyCodeResDto } from '../dtos/auth.sendVerifyCodeDto';
import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';

import { mockPhoneVerificationDocument } from './mocks/auth.entity';
import {
  mockSendVerifyCodeReqDto,
  mockSendVerifyCodeResDto,
} from './mocks/auth.sendVerifyCodeDto';
import { createTestModule } from './createTestModule';
import { IVerifyResCode } from '../dtos/auth.verifyCodeDto';
import {
  mockVerifyCodeReqDto,
  mockVerifyCodeResDto,
} from './mocks/auth.verifyCodeDto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let repo: PhoneVerificationRepository;

  beforeEach(async () => {
    // 진짜 클래스를 TestModule에 넣는게 아니고
    // mock한 값을 넣으면 매번 스파이를 할 필요가 없다.
    const testModule = await createTestModule();
    controller = testModule.controller;
    service = testModule.service;
    repo = testModule.repo;

    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendVerifyCode', () => {
    describe('when sendVerifyCode is called', () => {
      let response: ISendVerifyCodeResDto;

      beforeEach(async () => {
        jest
          .spyOn(repo, 'upsert')
          .mockResolvedValue(mockPhoneVerificationDocument());

        jest.spyOn(service, 'sendVerifyCode').mockResolvedValue(true);

        response = await controller.sendVerifyCode(mockSendVerifyCodeReqDto());
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

  describe('verifyCode', () => {
    describe('when verifyCode is called', () => {
      let response: IVerifyResCode;

      beforeEach(async () => {
        jest
          .spyOn(repo, 'findOne')
          .mockResolvedValue(mockPhoneVerificationDocument());

        jest.spyOn(service, 'verifyCode').mockResolvedValue(true);

        response = await controller.verifyCode(mockVerifyCodeReqDto());
      });

      it('should call authService', () => {
        expect(service.verifyCode).toBeCalledWith(mockVerifyCodeReqDto());
      });

      it('should return sendVerifyCodeResDto', () => {
        expect(response).toEqual(mockVerifyCodeResDto());
      });
    });
  });
});
