import { ValidationError } from 'class-validator';
import { IValidationProperty } from './validation.exception';

// TODO: Remove
export function isCountryCode(value: string): boolean {
  return /^\+[0-9]{1,3}$/.test(value);
}

// TODO: Remove
export function isPhone(value: any): boolean {
  return /^[1-9][0-9]{8}$/.test(value);
}

// TODO: Remove
export function isOtp(value: string): boolean {
  return /^\+[0-9]{6}$/.test(value);
}

/**
 * Builds an object containing validation errors for the given array of `ValidationError` objects,
 * including any errors for child properties.
 * @param {ValidationError[]} errors - The array of `ValidationError` objects to build errors for.
 * @param {string} [parentKey=''] - The optional parent key to use when building child error keys.
 * @returns {IValidationProperty[]} - An object array containing validation errors, where each key is a property with a
 * value that is an array of error messages.
 */
export function buildError(errors: ValidationError[], parentKey: string = ''): IValidationProperty[] {
  const result: IValidationProperty[] = [];
  for (const error of errors) {
    const key = parentKey ? `${parentKey}.${error.property}` : error.property;
    if (error.constraints) {
      result.push({ path: key, message: Object.values(error.constraints), value: error.value });
      continue;
    }

    if (error.children?.length) {
      const childErrors = buildError(error.children, key);
      result.push(...childErrors);
    }
  }
  return result;
}
