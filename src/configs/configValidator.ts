import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import _ from 'lodash';

const createTestableObject = (environment: any) => (configs: any) => {
  return plainToInstance(configs, environment, {
    enableImplicitConversion: true,
  });
};

const findError = (testableObject: any) => {
  return validateSync(testableObject, { skipMissingProperties: false });
};

const validateConfig = (configs: any) => (environment: Record<string, any>) => {
  const errors = _.chain(configs)
    .map(createTestableObject(environment))
    .flatMap(findError)
    .value();

  if (!_.isEmpty(errors)) {
    throw new Error(errors.toString());
  }

  return environment;
};

export { validateConfig };
