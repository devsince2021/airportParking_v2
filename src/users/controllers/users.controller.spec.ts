import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dtos/createUser.dto';
import { SignInTypes, User } from '../entities/user.entity';

import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('[Post] createUser', () => {
  //   it('should return the User when receives a proper createUserDto', async () => {
  //     const properDto: CreateUserDto = {
  //       email: 'test@gmail.com',
  //       name: 'test',
  //       password: '1234',
  //       phone: '123',
  //       signInType: SignInTypes.Email,
  //     };

  //     const user = await controller.createUser(properDto);

  //     expect(user).toBeInstanceOf(User);
  //     expect(user).toHaveProperty('id');
  //     expect(user).toHaveProperty('isActive');
  //     expect(user).toHaveProperty('phone');
  //     expect(user).toHaveProperty('role');
  //     expect(user).toHaveProperty('signInType');
  //   });

  //   // it('should throw an exception when services has problem', () => {});
  // });
});
