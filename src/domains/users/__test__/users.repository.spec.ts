import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../users.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { mockValidCreateUserReqDto } from './mocks/users.createDto';
import { mockValidUser } from './mocks/users.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('insert', () => {
    const reqDto = mockValidCreateUserReqDto();
    const validUser = mockValidUser();

    it('should return a created user when it success', async () => {
      jest.spyOn(repo, 'create').mockReturnValue(validUser);
      jest.spyOn(repo, 'save').mockResolvedValue(undefined);
      const user = await repository.insert(reqDto);
      expect(user).toEqual(validUser);
    });

    it('should throw a badRequest exception', async () => {
      jest.spyOn(repo, 'create').mockReturnValue(validUser);
      jest.spyOn(repo, 'save').mockRejectedValue({ code: 'ER_DUP_ENTRY' });
      try {
        await repository.insert(reqDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
