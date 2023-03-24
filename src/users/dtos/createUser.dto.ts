import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export interface ICreateUserDto {
  email: string;
  password: string;
  name: string;
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
}
