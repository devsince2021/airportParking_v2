import { Controller, Get, Query } from '@nestjs/common';
import { ReservationsService } from 'src/api_v2/reservations/reservations.service';

@Controller('/api_v1/dailychart')
export class AppControllerV1 {
  constructor(private reservationService: ReservationsService) {}

  @Get()
  async getChart(@Query('listDate') date) {
    console.log('hi?');
    const tempId = 1;
    const reservation = await this.reservationService.getReservations(
      date,
      tempId,
    );

    return {
      isSuccess: true,
      data: reservation,
    };
  }
}
