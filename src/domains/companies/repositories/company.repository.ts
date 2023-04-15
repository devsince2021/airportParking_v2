import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { BadRequestError } from '../../../utils/customException';

import { Company } from '../entities/company.entity';
import { CreateCompanyReqDto } from '../dtos/create.company.dto';
import {
  Company_Repository_Code,
  Company_Repository_Msg,
} from '../constants/errorCode';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  async findOne(option: FindOneOptions<Company>) {
    try {
      const company = await this.companyRepository.findOne(option);

      return company;
    } catch (err) {
      throw new BadRequestError({
        message: Company_Repository_Msg.DB_FIND_DEFAULT,
        code: Company_Repository_Code.DB_FIND_DEFAULT,
      });
    }
  }

  async insert(createCompanyDto: CreateCompanyReqDto) {
    try {
      const company = this.companyRepository.create(createCompanyDto);
      await this.companyRepository.save(company);
      return company;
    } catch (err) {
      throw new BadRequestError({
        message: Company_Repository_Msg.DB_INSERT_DEFAULT,
        code: Company_Repository_Code.DB_INSERT_DEFAULT,
      });
    }
  }
}
