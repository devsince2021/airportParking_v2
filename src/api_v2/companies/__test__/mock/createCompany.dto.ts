import {
  ICreateCompanyReqDto,
  ICreateCompanyResDto,
} from '../../dtos/company.createCompany.dto';

const REG_NUMBER = '02-0000-000007';
const ID = 7;

export const mockValidCreateCompanyReqDto = (): ICreateCompanyReqDto => {
  return {
    registrationNumber: REG_NUMBER,
    name: '공항주차',
    contact: '010-9718-2118',
    representative: '김사장',
  };
};

export const mockInvalidCreateCompanyReqDto = () => {
  return {} as ICreateCompanyReqDto;
};

export const mockCreateCompanyResDtoSuccess = (): ICreateCompanyResDto => {
  return {
    isSuccess: true,
    data: {
      id: ID,
      isRunning: true,
      registrationNumber: REG_NUMBER,
      name: '공항주차',
      contact: '010-9718-2118',
      representative: '김사장',
    },
  };
};

// export const mockCreateCompanyResDtoFail = (): ICreateCompanyResDto => {
//   return {
//     isSuccess: false,
//     error: {
//       message: '회사를 생성하는 중 문제가 발생하였습니다.',
//       code: 'D_2000_Company',
//     },
//   };
// };
