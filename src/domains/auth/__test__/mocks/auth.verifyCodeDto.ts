import { IVerifyReqCode, IVerifyResCode } from '../../dtos/auth.verifyCodeDto';

export const mockVerifyCodeReqDto = (): IVerifyReqCode => {
  return {
    phone: '01011111111',
    code: '1235',
  };
};

export const mockVerifyCodeResDto = (): IVerifyResCode => {
  return {
    isSuccess: true,
  };
};
