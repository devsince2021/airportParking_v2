import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  isNotIn,
} from 'class-validator';

export interface ICreateReservationDto {
  date: string;
  companyId: number;
  file: Express.Multer.File;
}

export class CreateReservationDto implements ICreateReservationDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNumber()
  companyId: number;

  file: Express.Multer.File;
}
