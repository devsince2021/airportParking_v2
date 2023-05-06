import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Reservation } from '../reservations';
import { User } from 'src/domains/users';

const companySwagger: Record<keyof Company, any> = {
  id: {
    example: 1,
  },
  name: {
    example: '주차장',
    description: '주차장 상호명',
  },
  representative: {
    example: '김아무개',
    description: '회사 담당자',
  },
  contact: {
    example: '01011111111',
    description: '-없는 11자리 전화번호, 화사 담당자 전화번호',
  },
  registrationNumber: {
    example: '000000000',
    description: '-가 없는 10자리 사업자등록증번호',
  },
  staff: {
    example: '1',
    description: '직원의 db id',
  },
  reservation: {
    // example: '1',
    // description: '소속되어있는 워크스페이스 id',
  },
  isRunning: {
    example: 'true',
    description: '현재 영업 중 여부',
  },
};

@Entity('company')
@Unique(['registrationNumber'])
export class Company {
  @ApiProperty(companySwagger.id)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty(companySwagger.name)
  @Column()
  name: string;

  @ApiProperty(companySwagger.representative)
  @Column()
  representative: string;

  @ApiProperty(companySwagger.contact)
  @Column()
  contact: string;

  @ApiProperty(companySwagger.registrationNumber)
  @Column()
  registrationNumber: string;

  @OneToMany(() => Reservation, (r) => r.company)
  reservation?: Reservation[];

  @OneToMany(() => User, (u) => u.company)
  staff?: User[];

  @ApiProperty(companySwagger.isRunning)
  @Column({ default: true })
  isRunning: boolean;
}
