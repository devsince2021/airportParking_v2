import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BadRequestError } from '../../../utils/customException';
import { CompanyRepository } from '../repositories/company.repository';
import { Company } from '../entities/company.entity';
import {
  Company_Repository_Code,
  Company_Repository_Msg,
} from '../constants/errorCode';

import { mockValidCreateCompanyReqDto } from './mock/createCompany.dto';
import { mockCompany } from './mock/company.entity';

describe('CompanyRepository', () => {
  let customRepo: CompanyRepository;
  let repo; // Repository<Company>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CompanyRepository,
        {
          provide: getRepositoryToken(Company),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    customRepo = module.get<CompanyRepository>(CompanyRepository);
    repo = module.get(getRepositoryToken(Company));
  });

  it('should defiend', () => {
    expect(customRepo).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('findOne', () => {
    const company = mockCompany();
    const validDto = mockValidCreateCompanyReqDto();
    const where = { registrationNumber: validDto.registrationNumber };

    it('should return company if a company meets condition', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(company);
      const result = await customRepo.findOne({ where });

      expect(result).toEqual(company);
    });

    it("should return null if any company doesn't meet condition", async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      const result = await customRepo.findOne({ where });

      expect(result).toEqual(null);
    });

    it('should throw exception with errorCode and message when error occurs', async () => {
      jest.spyOn(repo, 'findOne').mockRejectedValue(
        new BadRequestError({
          code: '123',
          message: 'test message',
        }),
      );

      try {
        await customRepo.findOne({ where });
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestError);
      }
    });
  });

  describe('insert', () => {
    const company = mockCompany();
    const validDto = mockValidCreateCompanyReqDto();

    it('should return company created', async () => {
      jest.spyOn(repo, 'create').mockResolvedValue(company);
      const result = await customRepo.insert(validDto);
      expect(result).toEqual(company);
    });

    it('should throw exception when fail to create', async () => {
      jest.spyOn(repo, 'create').mockImplementation(() => {
        throw new Error();
      });

      try {
        await customRepo.insert(validDto);
      } catch (err) {
        const errObj = JSON.parse(err.message);

        expect(err).toBeInstanceOf(BadRequestError);
        expect(errObj.message).toBe(Company_Repository_Msg.DB_INSERT_DEFAULT);
        expect(errObj.code).toBe(Company_Repository_Code.DB_INSERT_DEFAULT);
      }
    });

    it('should throw exception when fail to save', async () => {
      jest.spyOn(repo, 'save').mockRejectedValue(new Error());

      try {
        await customRepo.insert(validDto);
      } catch (err) {
        const errObj = JSON.parse(err.message);

        expect(err).toBeInstanceOf(BadRequestError);
        expect(errObj.message).toBe(Company_Repository_Msg.DB_INSERT_DEFAULT);
        expect(errObj.code).toBe(Company_Repository_Code.DB_INSERT_DEFAULT);
      }
    });
  });
});
