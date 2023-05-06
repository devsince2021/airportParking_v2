import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class CompanyGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const hasCompany = !_.isNil(request.user?.companyId);

    return hasCompany;
  }
}
