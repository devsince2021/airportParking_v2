import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';
import { PhoneVerificationDocument } from '../entities/phoneVerification';

import { mockPhoneVerificationDocument } from './mocks/auth.entity';
import { mockVerificationRecord } from './mocks/auth.phoneVerificationRecordDto';
import { createTestModule } from './createTestModule';

describe('AuthController', () => {
  let repo: PhoneVerificationRepository;
  let schema;

  beforeEach(async () => {
    const testModule = await createTestModule();
    repo = testModule.repo;
    schema = testModule.schema;

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
