import { ICreateUserReqDto } from '../../dtos/createUser.dto';
import { SignInTypes } from '../../entities/user.entity';

export const mockValidCreateUserDto = (): ICreateUserReqDto => {
  return {
    password: '123',
    name: 'test',
    phone: '01011111111',
    signInType: SignInTypes.Phone,
  };
};

export const mockInvalidCreateUserDto = () => {
  return {
    password: '123',
    name: 'test',
    phone: '01011111111',
    signInType: SignInTypes.Phone,
  };
};
