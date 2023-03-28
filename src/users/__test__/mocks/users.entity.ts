import { SignInTypes, User, UserRole } from '../../entities/user.entity';

export const mockValidUser = (): User => {
  return {
    id: 1,
    isActive: true,
    name: 'test',
    email: 'test@gmail.com',
    phone: '01011111111',
    password: '123',
    role: UserRole.Staff,
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
    role: UserRole.Staff,
    // signInType: SignInTypes.Email,
  } as User;
};
