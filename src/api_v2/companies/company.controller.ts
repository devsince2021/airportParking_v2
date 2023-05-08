import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';

import { OPERATION, RESPONSE, TAG } from './defines/company.swagger';
import { CreateCompanyReqDto } from './dtos/company.createCompany.dto';

@ApiTags(TAG)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  @ApiOperation(OPERATION.createCompany)
  @ApiOkResponse(RESPONSE.createCompany)
  // @UsePipes() - todo: register pipe for check reg number
  async createCompany(@Body() dto: CreateCompanyReqDto) {
    const company = await this.companyService.createCompany(dto);

    return {
      isSuccess: true,
      data: company,
    };
  }
}
