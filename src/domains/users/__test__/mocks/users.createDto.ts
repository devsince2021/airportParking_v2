import {
  ICreateUserReqDto,
  ICreateUserResDto,
} from '../../dtos/createUser.dto';
import { SignInTypes } from '../../entities/user.entity';

export const mockValidCreateUserReqDto = (): ICreateUserReqDto => {
  return {
    password: '123',
    name: '김아무개',
    phone: '01011111111',
    signInType: SignInTypes.Phone,
    userId: 'awepf2',
  };
};

export const mockInvalidCreateUserReqDto = () => {
  return {
    password: '123',
    name: '김아무개',
    // phone: '01011111111',
    signInType: SignInTypes.Phone,
  } as ICreateUserReqDto;
};

export const mockValidCreateUserResDto = (): ICreateUserResDto => {
  return {
    id: 1,
    signInType: SignInTypes.Phone,
    isActive: true,
    name: '김아무개',
    phone: '01011111111',
    userId: 'awepf2',
  };
};

export const mockInvalidCreateUserResDto = () => {
  return {
    id: 1,
    signInType: SignInTypes.Phone,
    isActive: true,
    name: '김아무개',
    phone: '01097182118',
  } as ICreateUserResDto;
};
