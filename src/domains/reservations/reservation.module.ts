import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsParseService } from './services/reservationsParse.service';
import { ReservationsService } from './services/reservations.service';
import { Reservation } from './entities/reservations.entity';
import { ReservationRepository } from './repositories/reservation.repository';
import { ReservationsViewController } from './controllers/reservation.viewController';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationsController, ReservationsViewController],
  providers: [
    ReservationsService,
    ReservationsParseService,
    ReservationRepository,
  ],
})
export class ReservationModule {}
