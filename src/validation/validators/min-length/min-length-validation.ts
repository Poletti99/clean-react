/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {
    this.minLength = minLength;
  }

  validate(input: object): Error {
    return input[this.field]?.length < this.minLength
      ? new InvalidFieldError()
      : null;
  }
}
