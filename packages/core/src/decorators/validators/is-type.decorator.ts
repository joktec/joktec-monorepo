import { registerDecorator, toArray, validateSync, ValidationArguments, ValidationOptions } from '@joktec/utils';
import { isArray, isBoolean, isInteger, isString } from 'lodash';
import { Clazz } from '../../models';

const primitiveTypeValidator = {
  string(value: any, args: ValidationArguments) {
    return isString(value);
  },
  'string[]'(value: any, args: ValidationArguments) {
    return isArray(value) && value.every(v => isString(v));
  },
  int(value: any, args: ValidationArguments) {
    return isInteger(value);
  },
  'int[]'(value: any, args: ValidationArguments) {
    return isArray(value) && value.every(v => isInteger(v));
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
