import { sayHello } from './index';

describe('Sample Test', () => {
  test('Test sayHello', () => {
    expect(sayHello()).toBe('Hello');
  });
});
