import {
  Controller,
  Get,
  Render,
  UseGuards,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Query,
  Session,
  Res,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

import { AdminAuthGuard } from 'src/api_v2/auth/guards/auth.adminAuth.guard';
import { CompanyGuard } from 'src/api_v2/auth/guards/auth.company.guard';
import { AuthenticatedGuard } from 'src/api_v2/auth/guards/auth.authenticated.guard';
import { FileValidationPipe } from 'src/utils/fileValidation.pipe';
import { ReservationsService } from 'src/api_v2/reservations/reservations.service';
import { getCompanyId } from 'src/utils/session';

const create = '/reservation/new';
const read = '/reservation/list';

@Controller()
export class AppAdminController {
  constructor(
    private readonly configService: ConfigService,
    private readonly reservationService: ReservationsService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/company')
  @Render('company.ejs')
  async showCompanyReg() {
    return {
      title: '회사등록필요',
    };
  }

  @UseGuards(AuthenticatedGuard, CompanyGuard)
  @Get()
  async showDashboard(@Res() res) {
    return res.redirect(create);
  }

  // 예약 관리
  @UseGuards(AuthenticatedGuard, CompanyGuard)
  @Get(create)
  @Render('reservation.ejs')
  async showRegistration(@Query('isSuccess') isSuccess) {
    const uploadKey = this.configService.get('RESERVATION_UPLOAD_KEY');

    return {
      uploadKey,
      isSuccess,
    };
  }

  @UseGuards(AuthenticatedGuard, CompanyGuard)
  @Post('/reservation')
  @UseInterceptors(FileInterceptor('excel'))
  async createReservation(
    @UploadedFile(new FileValidationPipe()) file,
    @Body('date') date,
    @Session() session,
    @Res() res,
  ) {
    const companyId = getCompanyId(session);

    const isSuccess = await this.reservationService.createReservation({
      date,
      file,
      companyId,
    });

    return res.redirect(`${create}?isSuccess=${isSuccess}`);
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

  @UseGuards(AdminAuthGuard)
  @Post('/login')
  async login(@Res() res) {
    const isFail = res.locals.isFailLogin;
    const destination = isFail ? '/login?isSuccess=false' : '/';

    return res.redirect(destination);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/logout')
  async logout(@Req() req, @Res() res) {
    req.logout(function (err) {
      if (err) throw err;
      res.redirect('/login');
    });
  }
}
