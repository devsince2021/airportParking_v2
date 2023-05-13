import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import { CreateUserReqDto } from './dtos/users.createUser.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

  async getUser(userId: string) {
    const user = await this.usersRepository.find({ userId });

    if (!_.isNil(user)) {
      const { password, ...rest } = user;
      return rest;
    } else {
      return user;
    }
  }

  async createUser(createUserDto: CreateUserReqDto) {
    const hashedDto = await this.hashPassword(createUserDto);
    const { password, ...user } = await this.usersRepository.insert(hashedDto);

    return user;
  }

  async hashPassword(createUserDto: CreateUserReqDto) {
    const salt = this.configService.get('USER_PASSWORD_SALT');
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    return {
      ...createUserDto,
      password: hashedPassword,
    };
  }
}
