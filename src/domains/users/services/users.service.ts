import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dtos/createUser.dto';
import { SignInTypes, User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const user = new User();
    user.isActive = true;
    user.name = 'test';
    user.phone = '123123';
    user.signInType = SignInTypes.Phone;
    const res = await this.usersRepository.save(user);
    return res;
  }
}
