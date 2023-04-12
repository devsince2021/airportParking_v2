import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsParseService } from './services/reservationsParse.service';
import { ReservationsService } from './services/reservations.service';

@Module({
  imports: [],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsParseService],
})
export class ReservationModule {}
