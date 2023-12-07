import { isEmpty, isUndefined } from 'lodash';
import { BadRequestException, ExceptionMessage } from '../exceptions';
import { toArray } from '../utils';

export interface IValidationProperty {
  path: string;
  message: string | string[];
  value?: any;
}

export class ValidationException extends BadRequestException<{ validate: IValidationProperty[] }> {
  constructor(data: IValidationProperty | IValidationProperty[]) {
    super(ExceptionMessage.INVALID_INPUT, {
      validate: toArray(data).map(item => {
        return { ...item, message: toArray(item.message) };
      }),
    });
  }
}

export class ValidatorBuilder {
  private readonly validators: { [path: string]: { message: string[]; value?: any } } = {};

  static init(): ValidatorBuilder {
    return new ValidatorBuilder();
  }

  add(path: string, message: string | string[], value?: any): ValidatorBuilder {
    if (!this.validators[path]) {
      this.validators[path] = { message: [] };
    }
    this.validators[path].message.push(...toArray<string>(message));
    if (!isUndefined(value)) this.validators[path].value = value;
    return this;
  }

  remove(path: string): ValidatorBuilder {
    delete this.validators[path];
    return this;
  }

  isError(): boolean {
    return !isEmpty(this.validators);
  }

  build(): ValidationException {
    const err: IValidationProperty[] = Object.entries(this.validators).map(([path, data]) => {
      return { path, ...data };
    });
    return new ValidationException(err);
  }
}
