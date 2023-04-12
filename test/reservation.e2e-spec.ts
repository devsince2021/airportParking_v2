import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { setStaticFiles } from '../src/main';
import { initializeApp } from './helpers/initializeApp';

describe('Reservation controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initializeApp();
    setStaticFiles(app as any);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    console.log('closed');
  });

  describe('/registration [GET]', () => {
    it('should show a registration page', async () => {
      const response = await request(app.getHttpServer()).get(
        '/reservations/registration',
      );

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
    });
  });
});
