import { User } from '../user.entity';

export const TAG = 'User';

export const OPERATION = {
  createUser: {
    summary: '유저 생성 API',
    description: '유저를 생성하는 API 입니다.',
  },
};

export const RESPONSE = {
  createUser: {
    description: '새롭게 생성된 유저',
    type: User,
  },
};
