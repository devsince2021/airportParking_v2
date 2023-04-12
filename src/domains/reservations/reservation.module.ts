import { Module } from '@nestjs/common';
import { ReservationController } from './controllers/reservations.controller';

@Module({
  imports: [],
  controllers: [ReservationController],
  providers: [],
})
export class ReservationModule {}
