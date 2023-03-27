import { Test, TestingModule } from '@nestjs/testing';

describe('UsersService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  it('should be defined', () => {});
});
