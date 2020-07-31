import faker from 'faker';

import { FieldValidationSpy } from '@/validation/test';
import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const sut = ValidationComposite.build(fieldValidationsSpy);

  return { sut, fieldValidationsSpy };
};

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const fieldError = faker.random.words();
    fieldValidationsSpy[1].error = new Error(fieldError);

    const error = sut.validate(fieldName, faker.random.word());

    expect(error).toEqual(fieldError);
  });

  test('should return first error if various validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const errorMessage = faker.random.words();

    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.random.words());

    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toEqual(errorMessage);
  });

  test('should return first error if various validation fails', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);

    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toBeFalsy();
  });
});