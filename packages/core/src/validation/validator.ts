import { ValidationError } from 'class-validator';
import { IValidateError } from './validate.exception';

export const isCountryCode = (value: string): boolean => {
  return /^\+[0-9]{1,3}$/.test(value);
};

export const isPhone = (value: any): boolean => {
  return /^[1-9][0-9]{8}$/.test(value);
};

export const isOtp = (value: string): boolean => {
  return /^\+[0-9]{6}$/.test(value);
};

/**
 * Builds an object containing validation errors for the given array of `ValidationError` objects,
 * including any errors for child properties.
 * @param {ValidationError[]} errors - The array of `ValidationError` objects to build errors for.
 * @param {string} [parentKey=''] - The optional parent key to use when building child error keys.
 * @returns {IValidateError} - An object containing validation errors, where each key is a property with a
 * value that is an array of error messages.
 */
export const buildError = (errors: ValidationError[], parentKey: string = ''): IValidateError => {
  const result: IValidateError = {};
  for (const error of errors) {
    const key = parentKey ? `${parentKey}.${error.property}` : error.property;

    if (error.constraints) {
      result[key] = Object.values(error.constraints);
      continue;
    }

    if (error.children?.length) {
      const childErrors = buildError(error.children, key);
      Object.assign(result, childErrors);
    }
  }
  return result;
};
