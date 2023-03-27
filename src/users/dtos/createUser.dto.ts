import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export interface ICreateUserDto {
  email: string;
  password: string;
  name: string;
}

export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public name: string;
}
