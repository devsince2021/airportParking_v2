import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

import { SignInTypes } from '../entities/user.entity';

export interface ICreateUserDto {
  password: string;
  name: string;
  phone: string;
  signInType: SignInTypes;
}

const dtoSwagger: Record<keyof ICreateUserDto, any> = {
  password: {
    example: 'test1234!',
    description: '소문자 + 숫자 + 특수문자',
  },
  name: {
    example: '김하하',
    description: '성명',
  },
  phone: {
    example: '01011111111',
    description: '-없는 11자리 전화번호',
  },
  signInType: {
    enum: SignInTypes,
    enumName: '회원가입 종류',
  },
};

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty(dtoSwagger.password)
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty(dtoSwagger.name)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty(dtoSwagger.phone)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty(dtoSwagger.signInType)
  @IsNotEmpty()
  @IsEnum(SignInTypes)
  signInType: SignInTypes;
}
