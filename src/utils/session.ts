import _ from 'lodash';

export const getCompanyId = (session: any): number | null =>
  _.get(session, ['passport', 'user', 'companyId'], null);
