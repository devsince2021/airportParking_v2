import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';

import { mockCreateUserDto } from './mocks/users.createDto';
import { mockValidUser } from './mocks/users.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;

      beforeEach(async () => {
        jest.spyOn(repository, 'save').mockResolvedValue(mockValidUser());
        jest.spyOn(service, 'createUser').mockResolvedValue(mockValidUser());
        user = await controller.createUser(mockCreateUserDto());
      });

      test('then it should call userService', () => {
        expect(service.createUser).toBeCalledWith(mockCreateUserDto());
      });

      test('then it should return a user', () => {
        expect(user).toEqual(mockValidUser());
      });
    });
  });
});
