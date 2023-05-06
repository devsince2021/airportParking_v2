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
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedGuard } from './domains/auth/guards/authenticated.guard';
import { LocalAuthGuard } from 'src/domains/auth/guards/localAuth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/domains/reservations/pipes/FileValidation.pipe';
import { ReservationsService } from 'src/domains/reservations/services/reservations.service';

@Controller()
export class AppViewController {
  constructor(private readonly configService: ConfigService) {}

  // 예약 관리
  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('registration.ejs')
  async showRegistration() {
    const uploadKey = this.configService.get('RESERVATION_UPLOAD_KEY');

    return {
      frame: false,
      title: '예약',
      uploadKey,
      isSuccess: undefined,
    };
  }

  // @Post()
  // @Render('registration.ejs')
  // @UseInterceptors(FileInterceptor('excel'))
  // async createReservation(
  //   @UploadedFile(new FileValidationPipe()) file,
  //   @Body('date') date,
  //   @Request() req,
  // ) {
  //   console.log('req', req);
  //   const uploadKey = this.configService.get('RESERVATION_UPLOAD_KEY');
  //   const isSuccess = await this.reservationService.createReservation(
  //     date,
  //     file,
  //   );

  //   return {
  //     title: '예약',
  //     uploadKey,
  //     isSuccess,
  //   };
  // }

  // 로그인
  @Get('/login')
  @Render('login.ejs')
  async showLoginView() {
    return {
      frame: false,
      id: '',
      password: '',
      message: '',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @Render('login.ejs')
  async showLoginResult(@Request() req, @Response() res) {
    const { isSuccess, message } = res.locals;
    const { userId, password } = req.body;

    if (isSuccess) {
      return res.redirect('/');
    }

    return {
      frame: false,
      id: userId,
      password,
      message,
    };
  }
}
