import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
import { Loader } from 'src/loader';
import { NestExpressApplication } from '@nestjs/platform-express';

export const initializeApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  new Loader(app as NestExpressApplication).setStaticFiles();

  return app;
};
