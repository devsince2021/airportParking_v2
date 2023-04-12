import { Injectable } from '@nestjs/common';
import xlsx from 'xlsx';
import _ from 'lodash';
import {
  EXCEL_COLUMNS,
  Reservation,
  ServiceType,
} from '../entities/reservations.entity';
import { ConfigService } from '@nestjs/config';

type ParsedRow = Record<string, string>;

@Injectable()
export class ReservationsParseService {
  HEADER_ROW_INDEX = 2;

  CHARGE_EXCEPTION = '티몬';

  FILE_UPLOAD_KEY;

  constructor(private configService: ConfigService) {
    this.FILE_UPLOAD_KEY = this.configService.get('RESERVATION_UPLOAD_KEY');
  }

  parse(files: Express.Request['files'], listDate: string) {
    if (_.isNil(files) || _.isEmpty(files)) return [];

    try {
      if (Array.isArray(files)) {
        const parsedRows = this.getRowsFromExcelFile(files);
        const dbRows = parsedRows.map(this.convertToDBFormat(listDate));

        return dbRows;
      }
      return [];
    } catch (err: unknown) {
      console.error('An error occur in parser function in csvHandler.ts', err);
      if (process.env.NODE_ENV === 'development') throw err;
      return [];
    }
  }

  private convertToDBFormat(listDate: string) {
    return function (rows: string[]): Omit<Reservation, 'id'> {
      const serviceCharge = this.chargeStringToNumber(rows[6]);
      const serviceType = rows[1] || 'I';

      return {
        serviceType: serviceType as ServiceType,
        serviceTime: rows[2] || '',
        carType: rows[3] || '',
        plateNumber: rows[4] || '',
        contactNumber: rows[5] || '',
        serviceCharge: !_.isNaN(serviceCharge) ? serviceCharge : 0,
        customerName: rows[7] || '',
        note: rows[8] || '',
        serviceEndDate: rows[9] || '',
        listDate: listDate || '',
        companies: [],
      };
    };
  }

  private chargeStringToNumber(charge: string) {
    if (charge === this.CHARGE_EXCEPTION) {
      return 0;
    } else if (charge.includes(',')) {
      const strings = charge.split(',');
      return Number(`${strings[0]}${strings[1]}`);
    } else {
      return Number(charge);
    }
  }

  private getRowsFromExcelFile(excelFiles: Express.Multer.File[]) {
    if (_.isEmpty(excelFiles) || _.isNil(excelFiles)) return [];

    try {
      const workSheet = excelFiles.map(this.getWorkSheet);
      const rowsInJson = _.flatMap(workSheet, this.makeJson).map(
        this.trimPropertiesToProtectData,
      );
      const rowsInArray = rowsInJson.map(this.convertJsonToArray);

      return rowsInArray;
    } catch (err: unknown) {
      console.error(
        'An error occur in parseExcel function in csvHandler.ts',
        err,
      );
      if (process.env.NODE_ENV === 'development') throw err;
      return [];
    }
  }

  private convertJsonToArray(row: ParsedRow) {
    return EXCEL_COLUMNS.map((key) => row[key] ?? '');
  }

  private trimPropertiesToProtectData(row: ParsedRow) {
    if (_.isNil(row)) return {};
    const trimmed = Object.entries(row).map(([key, value]) => [
      this.trimValues(key),
      this.trimValues(value),
    ]);
    return Object.fromEntries(trimmed);
  }

  private trimValues(string: string) {
    return _.trim(string);
  }

  private makeJson(sheet: xlsx.WorkSheet): ParsedRow[] {
    return xlsx.utils.sheet_to_json(sheet, {
      raw: false,
      range: this.HEADER_ROW_INDEX,
    });
  }

  private getWorkSheet(file: Express.Multer.File) {
    const workBook = xlsx.read(file.buffer);
    return workBook.Sheets[workBook.SheetNames[0]];
  }
}
