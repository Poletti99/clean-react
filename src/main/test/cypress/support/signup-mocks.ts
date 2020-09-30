import faker from 'faker';
import * as Helper from './http-mocks';

export const mockEmailInUseError = (): void =>
  Helper.mockEmailInUseError(/signup/);

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpecteedError(/signup/, 'POST');

export const mockInvalidData = (): void =>
  Helper.mockOk(/signup/, 'POST', { invalid: faker.random.uuid() });

export const mockOk = (): void =>
  Helper.mockOk(/signup/, 'POST', { accessToken: faker.random.uuid() });
