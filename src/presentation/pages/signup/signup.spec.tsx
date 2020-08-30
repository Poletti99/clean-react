import React from 'react';
import { Helper, ValidationSpy, AddAccountSpy } from '@/presentation/test';
import {
  cleanup,
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SignUp from './signup';

const history = createMemoryHistory({ initialEntries: ['/login'] });

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  const addAccountSpy = new AddAccountSpy();
  validationSpy.errorMessage = params?.validationError;
  // const saveAccessTokenMock = new SaveAccessTokenMock();

  const sut = render(
    <Router history={history}>
      <SignUp validation={validationSpy} addAccount={addAccountSpy} />,
    </Router>,
  );

  return { sut, addAccountSpy };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  Helper.populateField(sut, 'name', name);
  Helper.populateField(sut, 'email', email);
  Helper.populateField(sut, 'password', password);
  Helper.populateField(sut, 'passwordConfirmation', password);

  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('SignUp Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationError);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateField(sut, 'email');
    Helper.testStatusForField(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateField(sut, 'password');
    Helper.testStatusForField(sut, 'password', validationError);
  });

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  test('Should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut();

    Helper.populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name');
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();

    Helper.populateField(sut, 'email');
    Helper.testStatusForField(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();

    Helper.populateField(sut, 'password');
    Helper.testStatusForField(sut, 'password');
  });

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut();

    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testStatusForField(sut, 'passwordConfirmation');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    Helper.populateField(sut, 'name');
    Helper.populateField(sut, 'email');
    Helper.populateField(sut, 'password');
    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testButtonIsDisabled(sut, 'submit', false);
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);

    Helper.testElementExists(sut, 'spinner');
  });

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, name, email, password);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });
});
