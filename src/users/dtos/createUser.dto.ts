import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { SignInTypes } from '../entities/user.entity';

export interface ICreateUserDto {
  email: string;
  password: string;
  name: string;
  phone: string;
  signInType: SignInTypes;
}

export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEnum(SignInTypes)
  signInType: SignInTypes;
}
