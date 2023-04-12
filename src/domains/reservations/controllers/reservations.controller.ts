import { Controller, Get, Render } from '@nestjs/common';

@Controller('reservations')
export class ReservationController {
  @Get('/registration')
  @Render('registration.ejs')
  async showRegistration() {
    return { url: 'hi', uploadKey: 'ea' };
  }
}
