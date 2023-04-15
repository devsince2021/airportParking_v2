import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { ICreateCompanyReqDto } from '../dtos/create.company.dto';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async createCompany(dto: ICreateCompanyReqDto) {
    const company = await this.companyRepository.create(dto);
    return company;
  }
}
