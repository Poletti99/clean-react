import {
  AddAccount,
  AddAccountParams,
  AuthenticationParams,
} from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { HttpPostClient } from '@/data/protocols/http';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccountParams,
      AccountModel
    >,
  ) {
    this.url = url;
  }

  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    return null;
  }
}