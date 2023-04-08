import { PhoneVerificationRecord } from '../../dtos/auth.phoneVerificationRecordDto';

// service
export const mockVerificationRecord = (): PhoneVerificationRecord => {
  return {
    phone: '01022222222',
    code: '0000',
  };
};
