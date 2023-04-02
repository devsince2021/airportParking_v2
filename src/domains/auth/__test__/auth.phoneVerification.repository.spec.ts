import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';
import {
  PhoneVerification,
  PhoneVerificationDocument,
} from '../entities/phoneVerification';

import { mockPhoneVerificationDocument } from './mocks/auth.entity';
import { mockVerificationRecord } from './mocks/auth.phoneVerificationRecordDto';

describe('AuthController', () => {
  let repo: PhoneVerificationRepository;
  let schema;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhoneVerificationRepository,
        {
          provide: getModelToken(PhoneVerification.name),
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue(mockPhoneVerificationDocument()),
          },
        },
      ],
    }).compile();

    repo = module.get<PhoneVerificationRepository>(PhoneVerificationRepository);
    schema = module.get(getModelToken(PhoneVerification.name));
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('upsert', () => {
    describe('when upsert is called', () => {
      beforeEach(async () => {
        jest.restoreAllMocks();
      });

      it('should create new record, when there is not a record having the same phone', async () => {
        jest.spyOn(repo, 'findOne').mockResolvedValue(null);
        jest
          .spyOn(schema, 'create')
          .mockResolvedValue(mockPhoneVerificationDocument());
        jest
          .spyOn(repo, 'insert')
          .mockResolvedValue(mockPhoneVerificationDocument());

        await repo.upsert(mockVerificationRecord());

        expect(repo.insert).toBeCalledWith(mockVerificationRecord());
      });

      it('should update record, when there is a record having the same phone', async () => {
        const doc = mockPhoneVerificationDocument();
        const dto = mockVerificationRecord();
        const mockingDoc = {
          phone: doc.phone,
          code: dto.code,
        };

        jest.spyOn(repo, 'findOne').mockResolvedValue(doc);

        jest
          .spyOn(repo, 'update')
          .mockResolvedValue(mockingDoc as PhoneVerificationDocument);

        const result = await repo.upsert(dto);

        expect(repo.update).toBeCalledWith(doc, dto);

        expect(result.phone).toBe(dto.phone);
        expect(result.code).not.toBe(doc.code);
        expect(result.code).toBe(dto.code);
      });
    });
  });
});
