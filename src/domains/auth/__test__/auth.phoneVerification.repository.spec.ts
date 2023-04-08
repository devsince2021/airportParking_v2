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
    // repo = testModule.repo;
    // schema = testModule.schema;

    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    // expect(repo).toBeDefined();
  });

  // describe('upsert', () => {
  //   describe('when upsert is called', () => {
  //     let document;
  //     let record;

  //     beforeEach(async () => {
  //       document = mockPhoneVerificationDocument();
  //       record = mockVerificationRecord();
  //       jest.restoreAllMocks();
  //     });

  //     it('should create new record, when there is not a record having the same phone', async () => {
  //       jest.spyOn(repo, 'findOne').mockResolvedValue(null);
  //       jest.spyOn(schema, 'create').mockResolvedValue(document);
  //       jest.spyOn(repo, 'insert').mockResolvedValue(document);

  //       await repo.upsert(record);

  //       expect(repo.insert).toBeCalledWith(record);
  //     });

  //     it('should update record, when there is a record having the same phone', async () => {
  //       const mockingDoc = {
  //         phone: document.phone,
  //         code: record.code,
  //       };

  //       jest.spyOn(repo, 'findOne').mockResolvedValue(document);

  //       jest
  //         .spyOn(repo, 'update')
  //         .mockResolvedValue(mockingDoc as PhoneVerificationDocument);

  //       const result = await repo.upsert(record);

  //       expect(repo.update).toBeCalledWith(document, record);

  //       expect(result.phone).toBe(record.phone);
  //       expect(result.code).not.toBe(document.code);
  //       expect(result.code).toBe(record.code);
  //     });
  //   });
  // });
});
