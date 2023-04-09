import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../src/app.module';
import {
  mockInvalidCreateUserReqDto,
  mockValidCreateUserReqDto,
  mockValidCreateUserResDto,
} from '../src/domains/users/__test__/mocks/users.createDto';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('/user [POST]', () => {
    const resDto = mockValidCreateUserResDto();

    it('should response a created user with status code 201', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(mockValidCreateUserReqDto());

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.isActive).toBe(true);
      expect(response.body.name).toBe(resDto.name);
      expect(response.body.phone).toBe(resDto.phone);
      expect(response.body.signInType).toBe(resDto.signInType);
    });

    it('should throw 400 exception when dto is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/users')
        .send(mockInvalidCreateUserReqDto());

      expect(res.statusCode).toBe(400);
    });
  });
});
