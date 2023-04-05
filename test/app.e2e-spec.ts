import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../src/app.module';

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
    await app.close();
  });

  describe('Auth controllers', () => {
    describe('/auth/smsCode [POST]', () => {
      it('should response with a 201 status code and isSuccess true', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/smsCode')
          .send({ phone: '01097182118' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ isSuccess: true });
      });
    });

    // it('should response with a 201 status code and isSuccess true', async () => {
    //   const response = await request(app.getHttpServer())
    //     .post('/auth/smsCode')
    //     .send({ phone: '11' });

    //   expect(response.statusCode).toBe(201);
    //   expect(response.body).toEqual({ isSuccess: true });
    // });
  });
});
