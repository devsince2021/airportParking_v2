import { Test } from '@nestjs/testing';
import { CompanyService } from '../company.service';
import { CompanyRepository } from '../company.repository';
import { mockCompany } from './mock/company.entity';
import { mockValidCreateCompanyReqDto } from './mock/createCompany.dto';

jest.mock('../repositories/company.repository');

describe('company service', () => {
  let service: CompanyService;
  let repo: CompanyRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CompanyService, CompanyRepository],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repo = module.get<CompanyRepository>(CompanyRepository);
  });

  it('should defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('createCompany', () => {
    const company = mockCompany();
    const reqDto = mockValidCreateCompanyReqDto();

    it('should return create company', async () => {
      jest.spyOn(repo, 'create').mockResolvedValue(company);
      const result = await service.createCompany(reqDto);
      expect(result).toEqual(company);
    });

    it('should throw when fail to create company', async () => {
      jest.spyOn(repo, 'create').mockRejectedValue(new Error('fail'));
      try {
        await service.createCompany(reqDto);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('fail');
      }
    });
  });
});
