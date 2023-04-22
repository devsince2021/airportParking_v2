/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  DeleteQueryBuilder,
  FindOneOptions,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import _ from 'lodash';

import { Reservation } from '../entities/reservations.entity';

type ParamType<T> = T extends (param: infer P, ...args: any[]) => any
  ? P
  : never;

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private dataSource: DataSource,
  ) {}

  async bulkUpsert(date: string, rows: Omit<Reservation, 'id'>[]) {
    const list = await this.findOne({ listDate: date });

    if (_.isNil(list)) {
      await this.bulkInsert(rows);
    } else {
      await this.bulkUpdate(date, rows);
    }

    return true;
  }

  async findOne(option: FindOneOptions<Reservation>['where']) {
    try {
      const list = await this.reservationRepository.findOne({ where: option });

      return list;
    } catch (err) {
      throw new BadRequestException('예약 검색에 실패하였습니다.');
    }
  }

  async bulkInsert(rows: Omit<Reservation, 'id'>[]) {
    try {
      await this.reservationRepository
        .createQueryBuilder()
        .insert()
        .into(Reservation)
        .values(rows)
        .execute();
    } catch (err) {
      throw new BadRequestException('예약 목록 생성에 실패하였습니다.');
    }
  }

  async bulkUpdate(date: string, rows: Omit<Reservation, 'id'>[]) {
    let isSuccess;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.bulkDelete('listDate = :listDate', { listDate: date });
      await this.bulkInsert(rows);

      await queryRunner.commitTransaction();

      isSuccess = true;
    } catch (err) {
      console.warn('bulk update err');
      await queryRunner.rollbackTransaction();

      isSuccess = false;
    } finally {
      await queryRunner.release();

      if (!isSuccess) {
        throw new BadRequestException('예약 목록 갱신에 실패하였습니다.');
      }
    }
  }

  async bulkDelete(
    where: ParamType<DeleteQueryBuilder<Reservation>['where']>,
    params: ObjectLiteral,
  ) {
    try {
      await this.reservationRepository
        .createQueryBuilder()
        .delete()
        .from(Reservation)
        .where(where, params)
        .execute();
    } catch (err) {
      throw new BadRequestException('예약 삭제에 실패하였습니다.');
    }
  }
}
