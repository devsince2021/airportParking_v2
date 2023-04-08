import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import _ from 'lodash';

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

function IsValidPhone(options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPhone',
      target: object.constructor,
      async: false,
      propertyName,
      constraints: [],
      options,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const regex = /(\d{3})(\d{3,4})(\d{4})/;
          const res = value.match(regex);
          if (_.isNil(res)) return false;

          return true;
        },
      },
    });
  };
}

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
  @IsValidPhone()
  phone: string;
}

export class SendVerifyCodeResDto implements ISendVerifyCodeResDto {
  @ApiProperty(dtoSwagger.isSuccess)
  @IsNotEmpty()
  @IsBoolean()
  isSuccess: boolean;
}
