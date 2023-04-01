import {
  SendVerifyCodeReqDto,
  SendVerifyCodeResDto,
} from '../../dtos/auth.sendVerfyCodeDto';

export const mockSendVerifyCodeReqDto = (): SendVerifyCodeReqDto => {
  return {
    phone: '01097182118',
  };
};

export const mockSendVerifyCodeResDto = (): SendVerifyCodeResDto => {
  return {
    phone: '01097182118',
    code: '1234',
  };
};
