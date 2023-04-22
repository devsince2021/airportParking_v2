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

  // todo1 - 예약 변경하기 api v1에서 가져오기
  // todo2 - company 만들어서 예약에 물리기

  /** todo3
   * 하위 레이어에서 발생하는 문제는 에러코드와 메세지 객체를 throw 로 올린다.
   * 컨트롤러에서 캐치로 잡아서 필요한 핸들링 제공? 혹은 그냥 던지면 글로벌 익셉션 핸들러가 해주나?
   * 에러 코드 정리하기
   * 코드 메세지 함께 던질수잇는 커스텀 배드 리퀘스트 만들기
   */

  @Post()
  @UseInterceptors(FileInterceptor('excel')) // todo: 'excel'을 RESERVATION_UPLOAD_KEY로 대체
  async createReservation(
    @Query('date') date: string,
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ) {
    const isSuccess = await this.reservationService.createReservation(
      date,
      file,
    );

    return { isSuccess };
  }

  // 예약 변경 endpoint 추가
}
