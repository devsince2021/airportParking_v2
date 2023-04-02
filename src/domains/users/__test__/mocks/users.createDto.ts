import { CreateUserDto } from '../../dtos/createUser.dto';
import { SignInTypes } from '../../entities/user.entity';

export const mockCreateUserDto = (): CreateUserDto => {
  return {
    email: 'test@gmail.com',
    password: '123',
    name: 'test',
    phone: '01011111111',
    signInType: SignInTypes.Email,
  };
};
