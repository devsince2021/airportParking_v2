import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Reservation } from '../reservations.entity';
import { ReservationRepository } from '../reservation.repository';

import {
  mockReservation,
  mockReservationWithoutId,
} from './mock/reservation.entity';

describe('Reservation repository', () => {
  let customRepository: ReservationRepository;
  let dataSource;
  let repo;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ReservationRepository,
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn(),
            }),
          },
        },
        {
          provide: getRepositoryToken(Reservation),
          useValue: {
            findOne: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              insert: jest.fn().mockReturnThis(),
              into: jest.fn().mockReturnThis(),
              values: jest.fn().mockReturnThis(),
              execute: jest.fn().mockReturnThis(),
              from: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              delete: jest.fn().mockReturnThis(),
            }),
          },
        },
      ],
    }).compile();

    customRepository = module.get<ReservationRepository>(ReservationRepository);
    dataSource = module.get<DataSource>(DataSource);
    repo = module.get(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(customRepository).toBeDefined();
    expect(dataSource).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('findOne', () => {
    it('should return reservation if a result meets the given condition', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(mockReservation());
      const result = await customRepository.findOne({ listDate: '2023-03-12' });
      expect(result).toEqual(mockReservation());
    });

    it('should return null unless a result meets the given condition', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      const result = await customRepository.findOne({ listDate: '2023-03-12' });
      expect(result).toEqual(null);
    });

    it('should throw BadRequestException if error occurred', async () => {
      jest.spyOn(repo, 'findOne').mockRejectedValue(new Error());
      try {
        await customRepository.findOne({ listDate: '2023-03-12' });
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('bulkInsert', () => {
    it('should call "createQueryBuilder", "insert", "into", "values", "execute" in a row', async () => {
      await customRepository.bulkInsert([mockReservationWithoutId()]);

      expect(repo.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(repo.createQueryBuilder().insert).toHaveBeenCalledTimes(1);
      expect(repo.createQueryBuilder().insert().into).toHaveBeenCalledTimes(1);
      expect(
        repo.createQueryBuilder().insert().into().values,
      ).toHaveBeenCalledTimes(1);
      expect(
        repo.createQueryBuilder().insert().into().values().execute,
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw bad request exception if error take place', async () => {
      try {
        jest
          .spyOn(repo.createQueryBuilder(), 'execute')
          .mockRejectedValue(new Error());

        await customRepository.bulkInsert([mockReservationWithoutId()]);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('예약 목록 생성에 실패하였습니다.');
      }
    });
  });

  describe('bulkDelete', () => {
    it('should call "createQueryBuilder", "delete", "from", "where", "execute" in a row', async () => {
      await customRepository.bulkDelete('listDate = :listDate', {
        listDate: '2022-11-11',
      });

      expect(repo.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(repo.createQueryBuilder().delete).toHaveBeenCalledTimes(1);
      expect(repo.createQueryBuilder().delete().from).toHaveBeenCalledTimes(1);
      expect(
        repo.createQueryBuilder().delete().from().where,
      ).toHaveBeenCalledTimes(1);
      expect(
        repo.createQueryBuilder().delete().from().where().execute,
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw bad request exception if error take place', async () => {
      try {
        jest
          .spyOn(repo.createQueryBuilder(), 'execute')
          .mockRejectedValue(new Error());

        await customRepository.bulkDelete('listDate = :listDate', {
          listDate: '2022-11-11',
        });
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('예약 삭제에 실패하였습니다.');
      }
    });
  });

  describe('bulkUpdate', () => {
    const rows = [mockReservationWithoutId()];
    const date = '2022-11-11';

    it('should commit when delete and insert both success', async () => {
      const runner = dataSource.createQueryRunner();

      jest.spyOn(customRepository, 'bulkDelete').mockResolvedValue();
      jest.spyOn(customRepository, 'bulkInsert').mockResolvedValue();

      await customRepository.bulkUpdate(date, rows);

      expect(runner.commitTransaction).toBeCalled();
      expect(runner.rollbackTransaction).not.toBeCalled();
      expect(runner.release).toBeCalled();
    });

    it('should rollback when delete failed', async () => {
      const runner = dataSource.createQueryRunner();

      jest.spyOn(customRepository, 'bulkDelete').mockRejectedValue(undefined);
      jest.spyOn(customRepository, 'bulkInsert').mockResolvedValue();

      try {
        await customRepository.bulkUpdate(date, rows);
      } catch (err) {
        expect(runner.commitTransaction).not.toBeCalled();
        expect(runner.rollbackTransaction).toBeCalled();
        expect(runner.release).toBeCalled();

        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('예약 목록 갱신에 실패하였습니다.');
      }
    });

    it('should rollback when insert failed', async () => {
      const runner = dataSource.createQueryRunner();

      jest.spyOn(customRepository, 'bulkDelete').mockResolvedValue();
      jest.spyOn(customRepository, 'bulkInsert').mockRejectedValue(undefined);

      try {
        await customRepository.bulkUpdate(date, rows);
      } catch (err) {
        expect(runner.commitTransaction).not.toBeCalled();
        expect(runner.rollbackTransaction).toBeCalled();
        expect(runner.release).toBeCalled();

        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('예약 목록 갱신에 실패하였습니다.');
      }
    });
  });
});
