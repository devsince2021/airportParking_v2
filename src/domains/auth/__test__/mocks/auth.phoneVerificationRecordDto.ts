import { PhoneVerificationRecord } from '../../dtos/auth.phoneVerificaitonRecordDto';

// service
export const mockVerificationRecord = (): PhoneVerificationRecord => {
  return {
    phone: '01097182118',
    code: '0000',
  };
};
