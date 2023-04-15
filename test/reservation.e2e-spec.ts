import path from 'path';

import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import request from 'supertest';

import { setStaticFiles } from '../src/main';
import { initializeApp } from './helpers/initializeApp';

describe('Reservation controller [e2e]', () => {
  let app: INestApplication;
  let configService: ConfigService;

  beforeAll(async () => {
    app = await initializeApp();
    setStaticFiles(app as any);

    configService = app.get<ConfigService>(ConfigService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    console.log('closed');
  });

  describe('/reservations/registration [GET]', () => {
    it('should show a registration page', async () => {
      const response = await request(app.getHttpServer()).get(
        '/reservations/registration',
      );

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
    });
  });

  describe('/reservations [POST]', () => {
    it('should return { isSuccess: true } when reservation created successfully', async () => {
      const registrationDate = { date: '2023-04-13' };
      const uploadKey = configService.get('RESERVATION_UPLOAD_KEY');
      const samplePath = __dirname + '/../public/xlsx/sampleReservation.xlsx';

      const response = await request(app.getHttpServer())
        .post('/reservations')
        .query(registrationDate)
        .attach(uploadKey, path.resolve(samplePath));

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ isSuccess: true });
    });
  });
});
