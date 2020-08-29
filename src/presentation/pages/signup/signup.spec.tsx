import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import faker from 'faker';
import {
  RenderResult,
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { Helper, ValidationSpy } from '@/presentation/test';
import SignUp from './signup';

const history = createMemoryHistory({ initialEntries: ['/login'] });

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  // const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = params?.validationError;
  // const saveAccessTokenMock = new SaveAccessTokenMock();

  const sut = render(
    <Router history={history}>
      <SignUp validation={validationSpy} />,
    </Router>,
  );

  return { sut };
};

const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word(),
): void => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

describe('SignUp Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', 'Campo obrigatório');
    Helper.testStatusForField(sut, 'password', 'Campo obrigatório');
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório');
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationError);
  });
});
