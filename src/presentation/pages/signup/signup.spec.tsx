import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import faker from 'faker';
import { RenderResult, render } from '@testing-library/react';
import { Helper } from '@/presentation/test';
import SignUp from './signup';

const history = createMemoryHistory({ initialEntries: ['/login'] });

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(
    <Router history={history}>
      <SignUp />,
    </Router>,
  );

  return { sut };
};

describe('SignUp Page', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    const { sut } = makeSut();

    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});
