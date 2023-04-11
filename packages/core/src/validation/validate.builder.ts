import { IValidateError, ValidateException } from './validate.exception';
import { uniq } from 'lodash';

export class ValidateBuilder {
  private readonly validateError: IValidateError;

  private constructor() {
    this.validateError = {};
  }

  static create(property: string, ...messages: string[]): ValidateException {
    return new ValidateException({ [property]: messages });
  }

  static init(): ValidateBuilder {
    return new ValidateBuilder();
  }

  add(property: string, ...messages: string[]): ValidateBuilder {
    if (!this.validateError.hasOwnProperty(property)) this.validateError[property] = [];
    const unqMessages: string[] = [...this.validateError[property], ...messages];
    this.validateError[property] = uniq(unqMessages);
    return this;
  }

  build(): IValidateError {
    return this.validateError;
  }
}
