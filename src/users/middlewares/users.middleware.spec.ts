import { UsersMiddleware } from './users.middleware';

describe('MiddlewaresMiddleware', () => {
  it('should be defined', () => {
    expect(new UsersMiddleware()).toBeDefined();
  });
});
