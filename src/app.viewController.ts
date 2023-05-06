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

  @Get()
  @UseGuards(AuthenticatedGuard)
  @Render('dashboard.ejs')
  async showDashBoard() {
    return { title: '대시보드' };
  }

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
