import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  ONE_MB = 1000 * 1000 * 3;

  ERROR_MESSAGE = {
    size: '업로드 가능한 최대 파일 크기는 3MB입니다.',
    extension:
      "다음 3가지 확장자 중 1가지를 사용해주세요. 'excel', 'spreadsheetml', 'csv'",
  };

  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    const errorMessages = this.getErrorMessage(file);

    if (errorMessages) {
      throw new BadRequestException(errorMessages);
    }

    return file;
  }

  private getErrorMessage(file: Express.Multer.File) {
    if (!this.checkExtension(file)) {
      return this.ERROR_MESSAGE['extension'];
    } else if (file.size > this.ONE_MB) {
      return this.ERROR_MESSAGE['size'];
    }

    return;
  }

  private checkExtension(file: Express.Multer.File) {
    const acceptableExtensions = ['excel', 'spreadsheetml', 'csv'];
    return acceptableExtensions.some((extension) =>
      file.mimetype.includes(extension),
    );
  }
}
