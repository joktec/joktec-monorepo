import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { isNumber } from 'lodash';

export function Is2DIntArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'is2DIntArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) return false;
          return value.every(arr => Array.isArray(arr) && arr.every(num => isNumber(num) && Number.isInteger(num)));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a 2D array where each element is an array of exactly two integers`;
        },
      },
    });
  };
}
