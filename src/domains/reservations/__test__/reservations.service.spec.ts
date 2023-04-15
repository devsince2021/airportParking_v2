import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { ReservationsService } from '../services/reservations.service';
import { ReservationsParseService } from '../services/reservationsParse.service';
import { ReservationRepository } from '../repositories/reservation.repository';

import { dummyFile } from './mock/dummyFile';
import { mockReservationWithoutId } from './mock/reservation.entity';

jest.mock('../services/reservationsParse.service');
jest.mock('../repositories/reservation.repository');

describe('ReservationService', () => {
  let service: ReservationsService;
  let parser: ReservationsParseService;
  let repository: ReservationRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ReservationsService,
        ReservationsParseService,
        ReservationRepository,
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    parser = module.get<ReservationsParseService>(ReservationsParseService);
    repository = module.get<ReservationRepository>(ReservationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReservation', () => {
    it('should execute upsert when parser return rows', async () => {
      jest.spyOn(parser, 'parse').mockReturnValue([mockReservationWithoutId()]);
      await service.createReservation('2023-04-13', dummyFile);
      expect(repository.bulkUpsert).toBeCalledTimes(1);
    });

    it('should throw bad request exception when upsert failed', async () => {
      jest
        .spyOn(repository, 'bulkUpsert')
        .mockRejectedValue(new BadRequestException());

      try {
        await service.createReservation('2023-04-13', dummyFile);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return true when upsert success', async () => {
      jest.spyOn(parser, 'parse').mockReturnValue([mockReservationWithoutId()]);
      const res = await service.createReservation('2023-04-13', dummyFile);
      expect(res).toBe(true);
    });

    it('should not execute upsert when parser returns an empty list', async () => {
      jest.spyOn(parser, 'parse').mockReturnValue([]);
      try {
        await service.createReservation('2023-04-13', dummyFile);
        expect(repository.bulkUpsert).not.toBeCalled();
      } catch (err) {
        expect(repository.bulkUpsert).not.toBeCalled();
      }
    });

    it('should throw bad request exception when parser returns an empty list', async () => {
      jest.spyOn(parser, 'parse').mockReturnValue([mockReservationWithoutId()]);
      try {
        await service.createReservation('2023-04-13', dummyFile);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('파일 파싱에 실패하였습니다.');
      }
    });
  });
});
