import { Test } from '@nestjs/testing';
import { ReservationsController } from '../controllers/reservations.controller';
import { ConfigService } from '@nestjs/config';

const mockConfig = {
  RESERVATION_UPLOAD_URL: 'url',
  RESERVATION_UPLOAD_KEY: 'uploadKey',
};

describe('ReservationController', () => {
  let controller: ReservationsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => mockConfig[key]),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('showRegistration', () => {
    it('should return url and uploadKey', async () => {
      const response = await controller.showRegistration();
      expect(response).toEqual({
        url: mockConfig.RESERVATION_UPLOAD_URL,
        uploadKey: mockConfig.RESERVATION_UPLOAD_KEY,
      });
    });
  });
});
