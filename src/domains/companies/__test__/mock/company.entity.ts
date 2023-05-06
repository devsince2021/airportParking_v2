import { Company } from '../../company.entity';

export const mockCompany = (): Company => {
  return {
    id: 1,
    contact: '010-1111-111',
    representative: 'kim haha',
    isRunning: true,
    name: 'rara',
    registrationNumber: '02-000-000000',
  };
};
