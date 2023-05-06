import {
  ICreateUserReqDto,
  ICreateUserResDto,
} from '../../dtos/users.createUser.dto';
import { SignInTypes } from '../../user.entity';

export const mockValidCreateUserReqDto = () => {
  return {
    password: '123',
    name: '김아무개',
    phone: '01011111111',
    signInType: SignInTypes.UserId,
    userId: 'awepf2',
    company: '1',
  };
};

export const mockInvalidCreateUserReqDto = () => {
  return {
    password: '123',
    name: '김아무개',
    // phone: '01011111111',
    signInType: SignInTypes.UserId,
  } as ICreateUserReqDto;
};

export const mockValidCreateUserResDto = () => {
  return {
    id: 1,
    signInType: SignInTypes.UserId,
    isActive: true,
    name: '김아무개',
    phone: '01011111111',
    userId: 'awepf2',
    company: '1',
  };
};

export const mockInvalidCreateUserResDto = () => {
  return {
    id: 1,
    signInType: SignInTypes.UserId,
    isActive: true,
    name: '김아무개',
    phone: '01097182118',
  } as ICreateUserResDto;
};
