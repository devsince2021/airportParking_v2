import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';

import { Workspace } from '../../workspace';
import { SignInTypes } from '../entities/user.entity';

// request
export interface ICreateUserReqDto {
  password: string;
  name: string;
  phone: string;
  signInType: SignInTypes;
}

const reqDtoSwagger: Record<keyof ICreateUserReqDto, any> = {
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

export class CreateUserReqDto implements ICreateUserReqDto {
  @ApiProperty(reqDtoSwagger.password)
  @IsNotEmpty()
  @IsString()
  password: string;

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
}

// response
export interface ICreateUserResDto {
  id: number;
  signInType: SignInTypes;
  isActive: boolean;
  name: string;
  phone: string;
  workspace?: Workspace;
}

const resDtoSwagger: Record<keyof ICreateUserResDto, any> = {
  id: {
    example: '1',
    description: 'number타입의 유저 id',
  },
  workspace: {
    example: '1',
    description: 'number타입의 이용 가능한 워크스페이스 id',
  },
  isActive: {
    example: 'true',
    description: 'boolean타입의 현재 사용가능한 회원 여부',
  },
  name: reqDtoSwagger.name,
  phone: reqDtoSwagger.phone,
  signInType: reqDtoSwagger.signInType,
};

export class CreateUserResDto implements ICreateUserResDto {
  @ApiProperty(resDtoSwagger.id)
  @IsNotEmpty()
  @IsNumber()
  id: number;

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

  @ApiProperty(resDtoSwagger.workspace)
  @IsNumber()
  @IsOptional()
  workspace?: Workspace;

  @ApiProperty(resDtoSwagger.isActive)
  @IsNotEmpty()
  @IsNumber()
  isActive: boolean;
}
