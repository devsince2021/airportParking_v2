import {
  Controller,
  Get,
  Render,
  UseGuards,
  Request,
  Response,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Query,
  Session,
  Res,
  Param,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import _ from 'lodash';

import { LocalAuthGuard } from 'src/domains/auth/guards/localAuth.guard';
import { FileValidationPipe } from 'src/utils/fileValidation.pipe';
import { ReservationsService } from 'src/domains/reservations/reservations.service';
import { AuthenticatedGuard } from 'src/domains/auth/guards/authenticated.guard';

@Controller()
export class AppViewController {
  constructor(
    private readonly configService: ConfigService,
    private readonly reservationService: ReservationsService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/company')
  @Render('company.ejs')
  async showCompanyReg() {
    return {
      frame: false,
      title: '회사등록필요',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  async showDashboard(@Response() res) {
    return res.redirect('/reservation');
  }

  // 예약 관리
  @UseGuards(AuthenticatedGuard)
  @Get('/reservation')
  @Render('reservation.ejs')
  async showRegistration(@Query('isSuccess') isSuccess) {
    const uploadKey = this.configService.get('RESERVATION_UPLOAD_KEY');

    return {
      frame: false,
      title: '예약',
      uploadKey,
      isSuccess,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/reservation')
  @UseInterceptors(FileInterceptor('excel'))
  async createReservation(
    @UploadedFile(new FileValidationPipe()) file,
    @Body('date') date,
    @Session() session,
    @Res() res,
  ) {
    const companyId = _.get(session, ['passport', 'user', 'companyId'], null);

    const isSuccess = await this.reservationService.createReservation({
      date,
      file,
      companyId,
    });

    return res.redirect(`/reservation?isSuccess=${isSuccess}`);
  }

  // 로그인
  @Get('/login')
  @Render('login.ejs')
  async showLoginView(@Query('isSuccess') isSuccess) {
    const message = isSuccess === 'false' ? '로그인에 실패하였습니다.' : '';

    return {
      frame: false,
      message,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async showLoginResult(@Response() res) {
    const isFail = res.locals.isFailLogin;
    const destination = isFail ? '/login?isSuccess=false' : '/';

    return res.redirect(destination);
  }
}
