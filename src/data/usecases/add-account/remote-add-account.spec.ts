import faker from 'faker';

import { HttpPostClientSpy } from '@/data/test';
import { AccountModel } from '@/domain/models';
import { mockAuthentication, mockAddAccountParams } from '@/domain/test';
import { AddAccountParams, AuthenticationParams } from '@/domain/usecases';
import { RemoteAddAccount } from './remote-add-account';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct url', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);

    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });
});
