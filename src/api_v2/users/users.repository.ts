import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { CreateUserReqDto } from './dtos/users.createUser.dto';
import { User } from './user.entity';

const errorMessageTable = {
  ER_DUP_ENTRY: '중복된 유저 아이디 입니다. 다시 확인해주세요.',
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

  async find(where: FindOneOptions<User>['where']): Promise<User> | null {
    try {
      const user = await this.usersRepository.findOne({ where });

      return user;
    } catch (err) {
      this.handleError(err);
    }

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
