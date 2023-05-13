import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { getCompanyId } from 'src/utils/session';
import { FileValidationPipe } from '../../utils/fileValidation.pipe';
import { ReservationsService } from './reservations.service';
import { AuthenticatedGuard } from '../auth/guards/auth.authenticated.guard';
import { CompanyGuard } from '../auth/guards/auth.company.guard';

@Controller('api/reservation')
export class ReservationsController {
  constructor(private reservationService: ReservationsService) {}

  @UseGuards(AuthenticatedGuard, CompanyGuard)
  @Get()
  async getReservations(@Query('date') date, @Session() session) {
    const companyId = getCompanyId(session);
    const data = await this.reservationService.getReservations(date, companyId);

    return {
      isSuccess: true,
      data,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('excel')) // todo: 'excel'을 RESERVATION_UPLOAD_KEY로 대체
  async createReservation(
    @UploadedFile(new FileValidationPipe()) file,
    @Body('date') date,
    @Session() session,
  ) {
    const companyId = getCompanyId(session);
    const isSuccess = await this.reservationService.createReservation({
      date,
      file,
      companyId,
    });

    return { isSuccess };
  }
}
