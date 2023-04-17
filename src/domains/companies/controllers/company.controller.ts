import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BadRequestError } from '../../../utils/customException';
import { CompanyService } from '../services/company.service';

import { OPERATION, RESPONSE, TAG } from './swaggerDefine';
import { CreateCompanyReqDto } from '../dtos/createCompany.dto';

@ApiTags(TAG)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  @ApiOperation(OPERATION.createCompany)
  @ApiOkResponse(RESPONSE.createCompany)
  // @UsePipes() - todo: register pipe for check reg number
  async createCompany(@Body() dto: CreateCompanyReqDto) {
    try {
      const company = await this.companyService.createCompany(dto);

      return {
        isSuccess: true,
        data: company,
      };
    } catch (err) {
      if (err instanceof BadRequestError) {
        return {
          isSuccess: false,
          error: JSON.parse(err.message),
        };
      }
      throw err;
    }
  }
}
