import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { ReservationsController } from '../controllers/reservations.controller';
import { ReservationsService } from '../services/reservations.service';
import { dummyFile } from './mock/dummyFile';

const mockConfig = {
  RESERVATION_UPLOAD_URL: 'url',
  RESERVATION_UPLOAD_KEY: 'uploadKey',
};

jest.mock('@nestjs/config');
jest.mock('../services/reservations.service');

describe('ReservationController', () => {
  let controller: ReservationsController;
  let reservService: ReservationsService;

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
        ReservationsService,
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    reservService = module.get<ReservationsService>(ReservationsService);
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

  describe('createReservation', () => {
    it('should return isSuccess true when process success', async () => {
      jest.spyOn(reservService, 'createReservation').mockResolvedValue(true);
      const response = await controller.createReservation(
        '2022-04-13',
        dummyFile,
      );

      expect(response).toEqual({ isSuccess: true });
    });

    it('should return isSuccess false when process failed', async () => {
      jest.spyOn(reservService, 'createReservation').mockResolvedValue(false);
      const response = await controller.createReservation(
        '2022-04-13',
        dummyFile,
      );

      expect(response).toEqual({ isSuccess: false });
    });

    it('should throw badRequest exception when exception occur', async () => {
      jest
        .spyOn(reservService, 'createReservation')
        .mockRejectedValue(new BadRequestException());
      try {
        await controller.createReservation('2022-04-13', dummyFile);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
