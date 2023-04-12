import {
  Controller,
  Get,
  Post,
  Query,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../pipes/FileValidation.pipe';
import { ReservationsService } from '../services/reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private configService: ConfigService,
    private reservationService: ReservationsService,
  ) {}

  // todo: view와 api가 구분 되어야하지 않을까.
  @Get('/registration')
  @Render('registration.ejs')
  async showRegistration() {
    const url = this.configService.get('RESERVATION_UPLOAD_URL');
    const uploadKey = this.configService.get('RESERVATION_UPLOAD_KEY');

    return { url, uploadKey };
  }

  @Post()
  @UseInterceptors(FileInterceptor('excel')) // todo: 'excel'을 RESERVATION_UPLOAD_KEY로 대체
  async createReservation(
    @Query('date') date: string,
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ) {
    // const isSuccess = this.reservationService.createReservation(date, file);
    console.log('date', date);
    console.log('hire', file);
    return { isSuccess: true };
  }
}
