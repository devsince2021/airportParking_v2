import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  static initialize(app: INestApplication, config: ConfigService) {
    const document = Swagger.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  static createDocument(app: INestApplication, config: ConfigService) {
    const title = config.get('SWAGGER_TITLE');
    const desc = config.get('SWAGGER_DESC');
    const version = config.get('SWAGGER_VERSION');
    const tag = config.get('SWAGGER_TAG');

    const document = new DocumentBuilder()
      .setTitle(title)
      .setDescription(desc)
      .setVersion(version)
      .addTag(tag)
      .build();

    return SwaggerModule.createDocument(app, document);
  }
}
