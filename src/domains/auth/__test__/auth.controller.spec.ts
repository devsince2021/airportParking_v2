import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { ISendVerifyCodeResDto } from '../dtos/auth.sendVerifyCodeDto';
import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';
import { PhoneVerification } from '../entities/phoneVerification';

import { mockPhoneVerificationDocument } from './mocks/auth.entity';
import {
  mockSendVerifyCodeReqDto,
  mockSendVerifyCodeResDto,
} from './mocks/auth.sendVerifyCodeDto';
import { mockVerificationRecord } from './mocks/auth.phoneVerificationRecordDto';
import { createTestModule } from './createTestModule';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let repo: PhoneVerificationRepository;

  beforeEach(async () => {
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

        jest
          .spyOn(service, 'sendVerifyCode')
          .mockResolvedValue(mockVerificationRecord());

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
});
