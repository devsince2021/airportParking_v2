import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

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
      beforeEach(async () => {
        jest.spyOn(service, 'sendVerifyCode');
        await controller.sendVerifyCode();
      });

      test('then it should call authService', () => {
        expect(service.sendVerifyCode).toBeCalled();
      });
    });
  });
});
