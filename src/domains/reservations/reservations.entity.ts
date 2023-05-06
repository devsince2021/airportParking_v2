import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Company } from '../companies';

export const EXCEL_COLUMNS = [
  '번호',
  '입출고',
  '시간',
  '차량모델',
  '차번호',
  '핸드폰',
  '요금',
  '이름',
  '비고',
  '출고일',
];

export enum ServiceType {
  In = 'I',
  Out = 'O',
}

const reservationSwagger: Record<keyof Omit<Reservation, 'company'>, any> = {
  id: {
    example: 1,
  },
  serviceType: {
    example: 'I / O',
    description: '입차(In) / 출차(Out)',
  },
  serviceTime: {
    example: '15:40',
    description: '입차/출차 시간',
  },
  serviceCharge: {
    example: '50000',
    description: '서비스 요금',
  },
  customerName: {
    example: '김하하',
    description: '고객 이름',
  },
  contactNumber: {
    example: '010-1111-1111',
    description: '11자리 전화번호',
  },
  carType: {
    example: '쏘나타',
    description: '예약된 차량 종류',
  },
  plateNumber: {
    example: '02도 8805',
    description: '예약된 차량 번호',
  },
  serviceEndDate: {
    example: '07',
    description: '출고일?',
  },
  note: {
    example: '노트',
    description: '노트',
  },
  listDate: {
    example: '2020-02-20',
    description: '예약일',
  },
  companyId: {
    example: '1',
    description: '회사 고유 id',
  },
};

@Entity('reservation')
export class Reservation {
  @ApiProperty(reservationSwagger.id)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty(reservationSwagger.serviceType)
  @Column({
    type: 'enum',
    enum: ServiceType,
  })
  serviceType: ServiceType;

  @ApiProperty(reservationSwagger.serviceTime)
  @Column()
  serviceTime: string; // hh:mm

  @ApiProperty(reservationSwagger.serviceCharge)
  @Column()
  serviceCharge: number;

  @ApiProperty(reservationSwagger.customerName)
  @Column()
  customerName: string;

  @ApiProperty(reservationSwagger.contactNumber)
  @Column()
  contactNumber: string;

  @ApiProperty(reservationSwagger.carType)
  @Column()
  carType: string;

  @ApiProperty(reservationSwagger.plateNumber)
  @Column()
  plateNumber: string;

  @ApiProperty(reservationSwagger.note)
  @Column()
  note: string;

  @ApiProperty(reservationSwagger.serviceEndDate)
  @Column()
  serviceEndDate: string;

  @ApiProperty(reservationSwagger.serviceEndDate)
  @Column()
  listDate: string;

  @ApiProperty(reservationSwagger.companyId)
  @Column({ nullable: true })
  companyId: number;

  @ManyToOne(() => Company, (c) => c.reservation)
  company?: Company;
}
