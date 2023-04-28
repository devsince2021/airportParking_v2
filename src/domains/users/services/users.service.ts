import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { CreateUserReqDto } from '../dtos/createUser.dto';
import { UsersRepository } from '../repository/users.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

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
