import {
  SendVerifyCodeReqDto,
  SendVerifyCodeResDto,
  PhoneVerificationRecord,
} from '../../dtos/auth.sendVerifyCodeDto';

// service
export const mockVerificationRecord = (): PhoneVerificationRecord => {
  return {
    phone: '01097182118',
    code: '0000',
  };
};

// controller
export const mockSendVerifyCodeReqDto = (): SendVerifyCodeReqDto => {
  return {
    phone: '01097182118',
  };
};

// controller
export const mockSendVerifyCodeResDto = (): SendVerifyCodeResDto => {
  return {
    phone: '01097182118',
    code: '1234',
  };
};
