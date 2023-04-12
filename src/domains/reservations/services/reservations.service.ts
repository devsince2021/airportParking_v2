import { Injectable } from '@nestjs/common';
import { ReservationsParseService } from './reservationsParse.service';

@Injectable()
export class ReservationsService {
  constructor(private parseService: ReservationsParseService) {}

  createReservation(date: string, file: Express.Multer.File) {
    console.log('date', date);
    console.log('file', file);
  }
}
