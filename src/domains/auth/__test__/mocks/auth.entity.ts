import { PhoneVerificationDocument } from '../../entities/phoneVerification';

export const mockPhoneVerificationDocument = () => {
  return {
    phone: '01022222222',
    code: '1234',
  } as PhoneVerificationDocument;
};
