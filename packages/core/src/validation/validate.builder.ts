import { uniq } from 'lodash';
import { IValidateError } from './validate.exception';

export class ValidateBuilder {
  private readonly validateError: IValidateError;

  private constructor() {
    this.validateError = {};
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

  remove(property: string): ValidateBuilder {
    if (this.validateError.hasOwnProperty(property)) {
      delete this.validateError[property];
    }
    return this;
  }

  build(): IValidateError {
    return this.validateError;
  }
}
