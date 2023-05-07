import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '../users.service';
import { UsersRepository } from '../users.repository';

import {
  mockValidCreateUserReqDto,
  mockValidCreateUserResDto,
} from './mocks/users.createDto';
import { mockValidUser } from './mocks/users.entity';
import { BadRequestException } from '@nestjs/common';

jest.mock('../repository/users.repository');

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  describe('createUser', () => {
    const createUserDto = mockValidCreateUserReqDto();
    const mockUser = mockValidUser();
    const resDto = mockValidCreateUserResDto();

    it('should return CreateUserResDto if creation success', async () => {
      jest.spyOn(repository, 'insert').mockResolvedValue(mockUser);
      const response = await service.createUser(createUserDto);
      expect(response).toEqual(resDto);
    });

    it('should throw when fail to create user', async () => {
      try {
        jest
          .spyOn(repository, 'insert')
          .mockRejectedValue(new BadRequestException());
        await service.createUser(createUserDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
