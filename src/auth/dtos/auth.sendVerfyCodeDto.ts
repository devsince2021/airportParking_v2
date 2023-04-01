export interface SendVerifyCodeReqDto {
  phone: string;
}

export interface SendVerifyCodeResDto {
  phone: string;
  code: string;
}
