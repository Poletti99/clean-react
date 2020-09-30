import React from 'react';
import faker from 'faker';
import { render, RenderResult, fireEvent } from '@testing-library/react';

import Context from '@/presentation/contexts/form/form-context';
import { Input } from '@/presentation/components';

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>,
  );
};

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);
    const input = sut.getByTestId(fieldName) as HTMLInputElement;

    expect(input.readOnly).toBe(true);
  });

  test('should remove readOnly on focus', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);
    const input = sut.getByTestId(fieldName) as HTMLInputElement;
    fireEvent.focus(input);

    expect(input.readOnly).toBe(false);
  });

  test('should focus input on label click', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);
    const input = sut.getByTestId(fieldName);
    const label = sut.getByTestId(`${fieldName}-label`);
    fireEvent.click(label);

    expect(document.activeElement).toBe(input);
  });
});
