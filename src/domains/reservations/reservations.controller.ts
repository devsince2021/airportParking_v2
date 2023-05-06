import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import _ from 'lodash';

import { FileValidationPipe } from '../../utils/fileValidation.pipe';
import { ReservationsService } from './reservations.service';

@Controller('api/reservation')
export class ReservationsController {
  constructor(
    private configService: ConfigService,
    private reservationService: ReservationsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('excel')) // todo: 'excel'을 RESERVATION_UPLOAD_KEY로 대체
  async createReservation(
    @UploadedFile(new FileValidationPipe()) file,
    @Body('date') date,
    @Session() session,
  ) {
    const companyId = _.get(session, ['passport', 'user', 'companyId'], null);
    const isSuccess = await this.reservationService.createReservation({
      date,
      file,
      companyId,
    });

    return { isSuccess };
  }
}
