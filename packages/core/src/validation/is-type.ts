import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  validateSync,
  isString,
  isArray,
  isInt,
  isBoolean,
} from 'class-validator';
import { Constructor } from '../models';

const primitiveTypeValidator = {
  string(value: any, args: ValidationArguments) {
    return isString(value);
  },
  'string[]'(value: any, args: ValidationArguments) {
    return isArray(value) && value.every(v => isString(v));
  },
  int(value: any, args: ValidationArguments) {
    return isInt(value);
  },
  boolean(value: any, args: ValidationArguments) {
    return isBoolean(value);
  },
};

type Clazz = Constructor<any>;

export function IsTypes(
  types: ReadonlyArray<'int' | 'string' | 'boolean' | 'string[]' | Clazz>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'wrongType',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return types.some(type => {
            return primitiveTypeValidator[type as string]
              ? primitiveTypeValidator[type as string](value, args)
              : !validateSync(new (type as Clazz)(value)).length;
          });
        },
        defaultMessage(validationArguments?: ValidationArguments) {
          return `${propertyName} in one of [${types.map(type => type['name'] ?? type).join(', ')}] types`;
        },
      },
    });
  };
}
