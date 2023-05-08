import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { AuthService } from '../services/auth.service';

import { NaverService } from '../services/naver.service';
import { AuthController } from '../auth.controller';

export const createTestModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule, HttpModule],
    controllers: [AuthController],
    providers: [
      AuthService,
      NaverService,
      {
        provide: CACHE_MANAGER,
        useValue: {
          get: () => '',
          set: jest.fn(),
        },
      },
    ],
  }).compile();

  const controller = module.get<AuthController>(AuthController);
  const service = module.get<AuthService>(AuthService);

  const naverService = module.get<NaverService>(NaverService);
  const cache = module.get<Cache>(CACHE_MANAGER);

  return { service, controller, naverService, cache };
};
