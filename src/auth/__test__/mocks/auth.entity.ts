import { PhoneVerificationDocument } from '../../entities/phoneVerification';

export const mockPhoneVerificationDocument = () => {
  return {
    phone: '01097182118',
    code: '1234',
  } as PhoneVerificationDocument;
};
