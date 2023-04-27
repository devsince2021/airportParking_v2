import request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { errorMessages } from '../src/domains/auth/pipes/smsCodePipe';

import { initializeApp } from './helpers/initializeApp';

const validNum = '01097182118';
const invalidNum = '01011111111';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initializeApp();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/login [GET]', () => {
    it('should show a login page', async () => {
      const response = await request(app.getHttpServer()).get('/auth/login');

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
    });
  });

  describe.skip('/auth/smsCode [POST]', () => {
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

  describe.skip('/auth/verifySmsCode [POST]', () => {
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
