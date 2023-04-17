import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import {
  mockCreateCompanyResDtoFail,
  mockCreateCompanyResDtoSuccess,
  mockInvalidCreateCompanyReqDto,
  mockValidCreateCompanyReqDto,
} from '../src/domains/companies/__test__/mock/createCompany.dto';
import { mockCompany } from '../src/domains/companies/__test__/mock/company.entity';
import { Company } from '../src/domains/companies';

import { initializeApp } from './helpers/initializeApp';

describe('Company controller [e2e]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initializeApp();
    await app.init();
  });

  afterAll(async () => {
    await app.init();
  });

  describe('/company [POST]', () => {
    const validDto = mockValidCreateCompanyReqDto();
    const invalidDto = mockInvalidCreateCompanyReqDto();
    const dtoWithDup = mockValidCreateCompanyReqDto();
    const successRes = mockCreateCompanyResDtoSuccess();
    const failRes = mockCreateCompanyResDtoFail();
    it('should return company when it success', async () => {
      const response = await request(app.getHttpServer())
        .post('/company')
        .send(validDto);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(successRes);
    });

    it('should throw bad request exception when request body is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/company')
        .send(invalidDto);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(failRes);
    });

    it('should throw bad request exception when registration number is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/company')
        .send(dtoWithDup);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(failRes);
    });
  });
});
