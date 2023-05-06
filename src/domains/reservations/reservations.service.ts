import { BadRequestException, Injectable } from '@nestjs/common';
import _ from 'lodash';

import { ReservationRepository } from './reservation.repository';
import { ReservationsParseService } from './reservations.parse_service';

@Injectable()
export class ReservationsService {
  constructor(
    private parseService: ReservationsParseService,
    private reservationRepository: ReservationRepository,
  ) {}

  async createReservation(date: string, file: Express.Multer.File) {
    const rows = this.parseService.parse([file], date);

    if (!_.isEmpty(rows)) {
      await this.reservationRepository.bulkUpsert(date, rows);
      return true;
    }

    throw new BadRequestException('파일 파싱에 실패하였습니다.');
  }
}
