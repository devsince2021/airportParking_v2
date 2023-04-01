import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { SendVerifyCodeResDto } from '../dtos/auth.sendVerfyCodeDto';
import {
  mockSendVerifyCodeReqDto,
  mockSendVerifyCodeResDto,
} from './mocks/auth.sendVerifyCodeDto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendVerifyCode', () => {
    describe('when sendVerifyCode is called', () => {
      let response: SendVerifyCodeResDto;

      beforeEach(async () => {
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
