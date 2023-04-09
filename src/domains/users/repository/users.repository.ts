import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserReqDto } from '../dtos/createUser.dto';
import { User } from '../entities/user.entity';

const errorMessageTable = {
  ER_DUP_ENTRY: '중복된 전화번호 입니다. 다시 확인해주세요.',
};

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async upsert() {
    //
  }

  async insert(createUserDto: CreateUserReqDto) {
    try {
      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);

      return user;
    } catch (err) {
      this.handleError(err);
    }
  }

  async find() {
    //
  }

  handleError(err: any) {
    const message = errorMessageTable[err.code];
    if (message) {
      throw new BadRequestException(message);
    } else {
      throw err;
    }
  }
}
