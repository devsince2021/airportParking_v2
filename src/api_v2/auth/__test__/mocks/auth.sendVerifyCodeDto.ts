import {
  ISendVerifyCodeReqDto,
  ISendVerifyCodeResDto,
} from '../../dtos/auth.sendVerifyCodeDto';

// controller
export const mockSendVerifyCodeReqDto = (): ISendVerifyCodeReqDto => {
  return {
    phone: '01097182118',
  };
};

// controller
export const mockSendVerifyCodeResDto = (): ISendVerifyCodeResDto => {
  return {
    isSuccess: true,
  };
};
