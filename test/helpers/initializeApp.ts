import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';

export const initializeApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  return moduleFixture.createNestApplication();
};
