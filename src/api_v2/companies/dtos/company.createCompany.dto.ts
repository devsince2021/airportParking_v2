import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Company } from '../company.entity';

export interface ICreateCompanyReqDto {
  registrationNumber: string;
  name: string;
  contact: string;
  representative: string;
}

const reqDtoSwagger: Record<keyof ICreateCompanyReqDto, any> = {
  registrationNumber: {
    example: '02000000000',
    description: '-없는 사업자 등록번호',
  },
  name: {
    example: '김포주차',
    description: '회사 상호',
  },
  contact: {
    example: '010-1111-1111',
    description: '회사 담당자 번호',
  },
  representative: {
    example: '김하마',
    description: '회사 담당자 이름',
  },
};

export class CreateCompanyReqDto implements ICreateCompanyReqDto {
  @ApiProperty(reqDtoSwagger.registrationNumber)
  @IsNotEmpty()
  @IsString()
  // @IsValidNumber
  registrationNumber: string;

  @ApiProperty(reqDtoSwagger.name)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty(reqDtoSwagger.contact)
  @IsNotEmpty()
  @IsString()
  contact: string;

  @ApiProperty(reqDtoSwagger.representative)
  @IsNotEmpty()
  @IsString()
  representative: string;
}

export interface ICreateCompanyResDto {
  isSuccess: boolean;
  data: Company;
}

const resDtoSwagger: Record<keyof ICreateCompanyResDto, any> = {
  isSuccess: {
    example: 'true',
    description: '생성 성공여부',
  },
  data: {
    example: Company,
    description: '생성된 회사 정보',
  },
};

export class CreateCompanyResDto implements ICreateCompanyResDto {
  @ApiProperty(resDtoSwagger.isSuccess)
  @IsNotEmpty()
  @IsBoolean()
  isSuccess: boolean;

  @ApiProperty(resDtoSwagger.data)
  @IsOptional()
  data: Company;
}
