import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsController } from './reservations.controller';
import { ReservationsParseService } from './reservations.parse_service';
import { ReservationsService } from './reservations.service';
import { Reservation } from './reservations.entity';
import { ReservationRepository } from './reservation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ReservationsParseService,
    ReservationRepository,
  ],
  exports: [ReservationsService],
})
export class ReservationModule {}
