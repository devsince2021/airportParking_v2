import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import {
  mockInvalidCreateCompanyReqDto,
  mockValidCreateCompanyReqDto,
} from '../src/domains/companies/__test__/mock/createCompany.dto';
import { mockCompany } from '../src/domains/companies/__test__/mock/company.entity';

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
    const company = mockCompany();
    it('should return company when it success', async () => {
      const response = await request(app.getHttpServer())
        .post('/company')
        .send(validDto);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ isSuccess: true, data: company });
    });

    it('should throw bad request exception when request body is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/company')
        .send(invalidDto);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: '잘못된 회사정보입니다.',
        code: 'code1',
      });
    });

    it('should throw bad request exception when registration number is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/company')
        .send(dtoWithDup);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: '올바르지 않은 사업자등록번호 입니다.',
        code: 'code2',
      });
    });

    it('should return message when it failed', async () => {
      const response = await request(app.getHttpServer())
        .post('/company')
        .send(validDto);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: '회사 등록 중에 문제가 발생하였습니다.',
        code: 'code3',
      });
    });
  });
});
