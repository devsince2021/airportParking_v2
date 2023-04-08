import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Workspace } from '../../workspace';

export enum SignInTypes {
  Email = 'EM',
  Kakao = 'KA',
}

const userSwagger: Record<keyof User, any> = {
  id: {
    example: 1,
  },
  email: {
    example: 'test@gmail.com',
    description: '이메일 형식',
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
  isActive: {
    example: true,
    description: '사용가능한 유저인가',
  },
  workspaces: {
    example: '[1, 2, 19]',
    description: '사용가능한 모든 워크스페이스의 id',
  },
};

@Entity('user')
@Unique(['phone'])
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

  @ApiProperty(userSwagger.email)
  @Column()
  email: string;

  @ApiProperty(userSwagger.password)
  @Column()
  password: string;

  @ApiProperty(userSwagger.workspaces)
  @ManyToMany(() => Workspace, (workspace) => workspace.users)
  workspaces: Workspace[];
}
