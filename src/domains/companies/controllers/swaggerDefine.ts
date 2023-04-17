// import { SendVerifyCodeResDto } from '../dtos/auth.sendVerifyCodeDto';
// import { VerifyCodeResDto } from '../dtos/auth.verifyCodeDto';

import { CreateCompanyResDto } from '../dtos/createCompany.dto';

export const TAG = 'Company';

export const OPERATION = {
  createCompany: {
    summary: '회사 등록 api',
    description: '사업자번호를 고유값으로 사용하는 회사를 등록하는 api 입니다.',
  },
};

export const RESPONSE = {
  createCompany: {
    description: '회사 생성 성공 여부 및 회사정보',
    type: CreateCompanyResDto,
  },
};
