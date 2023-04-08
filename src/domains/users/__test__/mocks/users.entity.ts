import { SignInTypes, User } from '../../entities/user.entity';

export const mockValidUser = () => {
  return {
    id: 1,
    isActive: true,
    name: 'test',
    email: 'test@gmail.com',
    phone: '01011111111',
    password: '123',
    signInType: SignInTypes.Email,
  };
};

export const mockInvalidUser = () => {
  return {
    id: 1,
    isActive: true,
    name: 'test',
    email: 'test@gmail.com',
    phone: '01011111111',
    // signInType: SignInTypes.Email,
  } as User;
};
