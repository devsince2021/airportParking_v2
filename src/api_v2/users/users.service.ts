import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { CreateUserReqDto } from './dtos/users.createUser.dto';
import { UsersRepository } from './users.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

  async getUser(getUserDto: any) {
    const user = await this.usersRepository.find({ id: getUserDto.id });
    console.log('user', user);
    return user;
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