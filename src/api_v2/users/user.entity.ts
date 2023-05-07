import { ApiProperty } from '@nestjs/swagger';

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { IsOptional } from 'class-validator';
import { Company } from 'src/api_v2/companies';

export enum SignInTypes {
  Kakao = 'KA',
  UserId = 'I',
}

const userSwagger: Record<keyof User, any> = {
  id: {
    example: 1,
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
  userId: {
    example: 'ha123',
    description: '로그인에 사용되는 id',
  },
  signInType: {
    enum: SignInTypes,
    enumName: '회원가입 종류',
  },
  isActive: {
    example: true,
    description: '사용가능한 유저인가',
  },
  companyId: {
    example: '1',
    description: '현재 속해있는 회사',
  },
  company: {
    example: '1',
    description: '현재 속해있는 회사',
  },
};

@Entity('user')
@Unique(['userId'])
export class User {
  @ApiProperty(userSwagger.id)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty(userSwagger.signInType)
  @Column({
    type: 'enum',
    enum: SignInTypes,
  })
  signInType: SignInTypes;

  @ApiProperty(userSwagger.isActive)
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty(userSwagger.name)
  @Column()
  name: string;

  @ApiProperty(userSwagger.phone)
  @Column()
  phone: string;

  @ApiProperty(userSwagger.userId)
  @Column()
  userId: string;

  @ApiProperty(userSwagger.password)
  @Column()
  password: string;

  @Column({ nullable: true })
  companyId: number;

  @ApiProperty(userSwagger.company)
  @ManyToOne(() => Company, (c) => c.reservation)
  company?: Company;
}
