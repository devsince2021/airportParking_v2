import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

const dtoSwagger = {
  phone: {
    example: '01011111111',
    description: '-없는 11자리 전화번호',
  },
  isSuccess: {
    example: true,
    description: '코드 발송의 성공여부',
  },
};

export interface ISendVerifyCodeReqDto {
  phone: string;
}

export interface ISendVerifyCodeResDto {
  isSuccess: boolean;
}

export class SendVerifyCodeReqDto implements ISendVerifyCodeReqDto {
  @ApiProperty(dtoSwagger.phone)
  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class SendVerifyCodeResDto implements ISendVerifyCodeResDto {
  @ApiProperty(dtoSwagger.isSuccess)
  @IsNotEmpty()
  @IsBoolean()
  isSuccess: boolean;
}
