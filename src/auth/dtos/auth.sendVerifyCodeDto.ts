export interface PhoneVerificationRecord {
  phone: string;
  code: string;
}
export interface SendVerifyCodeReqDto {
  phone: string;
}

export type SendVerifyCodeResDto = PhoneVerificationRecord;
