import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../pipes/FileValidation.pipe';
import { ReservationsService } from '../services/reservations.service';

@Controller('reservations')
export class ReservationsViewController {
  constructor(
    private readonly configService: ConfigService,
    private reservationService: ReservationsService,
  ) {}

  @Get()
  @Render('registration.ejs')
  async showRegistration() {
    const uploadKey = this.configService.get('RESERVATION_UPLOAD_KEY');

    return {
      title: '예약',
      uploadKey,
      isSuccess: undefined,
    };
  }

  @Post()
  @Render('registration.ejs')
  @UseInterceptors(FileInterceptor('excel'))
  async createReservation(
    @UploadedFile(new FileValidationPipe()) file,
    @Body('date') date,
    @Request() req,
  ) {
    console.log('req', req);
    const uploadKey = this.configService.get('RESERVATION_UPLOAD_KEY');
    const isSuccess = await this.reservationService.createReservation(
      date,
      file,
    );

    return {
      title: '예약',
      uploadKey,
      isSuccess,
    };
  }
}
