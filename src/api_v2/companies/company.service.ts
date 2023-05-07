import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { ICreateCompanyReqDto } from './dtos/company.createCompany.dto';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async createCompany(dto: ICreateCompanyReqDto) {
    const company = await this.companyRepository.create(dto);
    return company;
  }
}
