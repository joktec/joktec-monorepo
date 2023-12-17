import { isEmpty, isUndefined } from 'lodash';
import { BadRequestException, ExceptionMessage } from '../exceptions';
import { toArray } from '../utils';

export interface IValidationProperty {
  path: string;
  message: string | string[];
  value?: any;
}

export class ValidationException extends BadRequestException<{ validate: IValidationProperty[]; scope?: string }> {
  constructor(data: IValidationProperty | IValidationProperty[], scope: string = ValidationException.name) {
    super(ExceptionMessage.INVALID_INPUT, {
      scope,
      validate: toArray(data).map(item => {
        return { ...item, message: toArray(item.message) };
      }),
    });
  }
}

export class ValidatorBuilder {
  private readonly scope: string;
  private readonly validators: { [path: string]: { message: string[]; value?: any } } = {};

  private constructor(scope: string) {
    this.scope = scope;
    this.validators = {};
  }

  static init(scope: string = ValidationException.name): ValidatorBuilder {
    return new ValidatorBuilder(scope);
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
    return new ValidationException(err, this.scope);
  }

  throw() {
    if (!this.isError()) return;
    throw this.build();
  }
}
