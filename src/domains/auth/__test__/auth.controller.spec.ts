import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { ISendVerifyCodeResDto } from '../dtos/auth.sendVerifyCodeDto';

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

  beforeEach(async () => {
    const testModule = await createTestModule();
    controller = testModule.controller;
    service = testModule.service;

    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendVerifyCode', () => {
    describe('when sendVerifyCode is called', () => {
      let response: ISendVerifyCodeResDto;

      beforeEach(async () => {
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
