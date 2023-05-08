import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

import {
  mockValidCreateUserReqDto,
  mockValidCreateUserResDto,
} from './mocks/users.createDto';

jest.mock('../services/users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    const reqDto = mockValidCreateUserReqDto();
    const resDto = mockValidCreateUserResDto();

    it('should return CreateUserResDto if creation success', async () => {
      jest.spyOn(service, 'createUser').mockResolvedValue(resDto);
      const response = await controller.createUser(reqDto);

      expect(response).toEqual(resDto);
    });

    it('should throw when fail to create user', async () => {
      try {
        jest
          .spyOn(service, 'createUser')
          .mockRejectedValue(new BadRequestException());
        await controller.createUser(reqDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
