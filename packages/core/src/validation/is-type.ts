import {
  isArray,
  isBoolean,
  isInt,
  isString,
  registerDecorator,
  validateSync,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { Clazz } from '../models';
import { toArray } from '../utils';

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
  'int[]'(value: any, args: ValidationArguments) {
    return isArray(value) && value.every(v => isInt(v));
  },
  boolean(value: any, args: ValidationArguments) {
    return isBoolean(value);
  },
};

type TypeDefined = 'int' | 'int[]' | 'string' | 'boolean' | 'string[]' | Clazz;

export const IsTypes = (
  types: Readonly<TypeDefined> | ReadonlyArray<TypeDefined>,
  validationOptions?: ValidationOptions,
) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsTypes',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return toArray(types).some(type => {
            return primitiveTypeValidator[type as string]
              ? primitiveTypeValidator[type as string](value, args)
              : !validateSync(new (type as Clazz)(value)).length;
          });
        },
        defaultMessage(args?: ValidationArguments) {
          return `${propertyName} in one of [${toArray(types)
            .map(type => type['name'] ?? type)
            .join(', ')}] types`;
        },
      },
    });
  };
};
