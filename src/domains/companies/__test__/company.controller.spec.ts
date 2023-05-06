import { Test } from '@nestjs/testing';

import { BadRequestError } from '../../../utils/customException';
import { CompanyController } from '../company.controller';
import { CompanyService } from '../company.service';
import { CompanyRepository } from '../company.repository';

import { mockCompany } from './mock/company.entity';
import { mockValidCreateCompanyReqDto } from './mock/createCompany.dto';

jest.mock('../services/company.service');
jest.mock('../repositories/company.repository');

describe('Company controller', () => {
  let controller: CompanyController;
  let service: CompanyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService, CompanyRepository],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
  });

  it('should defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('/company [POST]', () => {
    const company = mockCompany();
    const reqDto = mockValidCreateCompanyReqDto();
    const err = new BadRequestError({ message: 'hi', code: 'C111' });

    it('should return success flag and company when valid dto comes', async () => {
      jest.spyOn(service, 'createCompany').mockResolvedValue(company);
      const result = await controller.createCompany(reqDto);

      expect(result).toHaveProperty('isSuccess');
      expect(result.isSuccess).toBe(true);
      expect(result).toHaveProperty('data');
      expect(result.data).toEqual(company);
    });

    it('should return success flag and message when it fails', async () => {
      jest.spyOn(service, 'createCompany').mockRejectedValue(err);

      const result = await controller.createCompany(reqDto);

      expect(result).toHaveProperty('isSuccess');
      expect(result.isSuccess).toBe(false);
      expect(result).toHaveProperty('error');
      expect(result.error).toHaveProperty('code');
      expect(result.error).toHaveProperty('message');
    });
  });
});
