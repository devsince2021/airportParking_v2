import { SendVerifyCodeResDto } from '../dtos/auth.sendVerifyCodeDto';

export const TAG = 'Auth';

export const OPERATION = {
  sendVerifyCode: {
    summary: '휴대폰 인증 번호 API',
    description:
      '휴대폰 번호 인증에 필요한 4자리 코드를 문자로 전송하는 api 입니다.',
  },
};

export const RESPONSE = {
  sendVerifyCode: {
    description: '코드 발송 성공 여부',
    type: SendVerifyCodeResDto,
  },
};
