import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum SignInTypes {
  Email = 'EM',
  Kakao = 'KA',
}

export enum UserRole {
  Founder = 'F',
  CoFounder = 'C',
  GeneralManager = 'G',
  Manager = 'M',
  Staff = 'S',
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
    description: '-없는 11자리 전화번호',
  },
  role: {
    enum: UserRole,
    enumName: '유저 권한',
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

  @ApiProperty(userSwagger.role)
  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @ApiProperty(userSwagger.email)
  @Column()
  email: string;

  @ApiProperty(userSwagger.password)
  @Column()
  password: string;

  //@ManyToOne()
  //Company: Company
}
