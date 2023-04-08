import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../src/app.module';
import { errorMessages } from '../src/domains/auth/pipes/smsCodePipe';

const validNum = '01097182118';
const invalidNum = '01011111111';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth controllers', () => {
    describe('/auth/smsCode [POST]', () => {
      it('should response with a 201 status code and isSuccess true', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/smsCode')
          .send({ phone: validNum });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ isSuccess: true });
      });

      it('should response with a 201 status code and isSuccess false when it has an invalid phone number', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/smsCode')
          .send({ phone: invalidNum });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ isSuccess: false });
      });

      it('should response with a 400 status code and error message when it called with an invalid format phone number', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/smsCode')
          .send({ phone: '21' });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
          error: 'Bad Request',
          message: errorMessages.phone,
          statusCode: 400,
        });
      });
    });
  });

  describe('/auth/verifySmsCode [POST]', () => {
    beforeEach(async () => {
      request(app.getHttpServer())
        .post('/auth/smsCode')
        .send({ phone: validNum });
    });

    it('should return false when code is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/verifySmsCode')
        .send({ phone: validNum, code: '1234' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ isSuccess: false });
    });
  });
});
