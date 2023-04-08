import { SignInTypes, User } from '../../entities/user.entity';

export const mockValidUser = () => {
  return {
    id: 1,
    isActive: true,
    name: 'test',
    phone: '01011111111',
    password: '123',
    signInType: SignInTypes.Phone,
  };
};

export const mockInvalidUser = () => {
  return {
    id: 1,
    isActive: true,
    name: 'test',
    phone: '01011111111',
    // signInType: SignInTypes.Email,
  };
};
