import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  isNotIn,
} from 'class-validator';

import { SignInTypes, User } from '../user.entity';
import { Company } from 'src/domains/companies';

export type ICreateUserReqDto = Omit<User, 'id' | 'isActive'>;

const reqDtoSwagger: Record<keyof ICreateUserReqDto, any> = {
  userId: {
    example: 'awef123',
    description: '임의의 텍스트',
  },
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
  company: {
    example: '1',
    description: '회사 id',
  },
};

export class CreateUserReqDto implements ICreateUserReqDto {
  @ApiProperty(reqDtoSwagger.password)
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty(reqDtoSwagger.userId)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty(reqDtoSwagger.name)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty(reqDtoSwagger.phone)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty(reqDtoSwagger.signInType)
  @IsNotEmpty()
  @IsEnum(SignInTypes ?? {})
  signInType: SignInTypes;

  @ApiProperty(reqDtoSwagger.company)
  company: any;
}

export type ICreateUserResDto = Omit<User, 'password'>;

const resDtoSwagger: Record<keyof ICreateUserResDto, any> = {
  id: {
    example: '1',
    description: 'number타입의 유저 id',
  },
  isActive: {
    example: 'true',
    description: 'boolean타입의 현재 사용가능한 회원 여부',
  },
  userId: reqDtoSwagger.userId,
  name: reqDtoSwagger.name,
  phone: reqDtoSwagger.phone,
  signInType: reqDtoSwagger.signInType,
  company: reqDtoSwagger.company,
};

export class CreateUserResDto implements ICreateUserResDto {
  @ApiProperty(resDtoSwagger.id)
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty(resDtoSwagger.userId)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty(resDtoSwagger.name)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty(resDtoSwagger.phone)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty(resDtoSwagger.signInType)
  @IsNotEmpty()
  @IsEnum(SignInTypes ?? {})
  signInType: SignInTypes;

  @ApiProperty(resDtoSwagger.isActive)
  @IsNotEmpty()
  @IsNumber()
  isActive: boolean;

  @ApiProperty(reqDtoSwagger.company)
  company: any;
}
