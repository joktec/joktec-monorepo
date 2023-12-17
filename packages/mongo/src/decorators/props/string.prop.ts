import { IsString, MaxLength, MinLength, IsEmail, ValidationOptions, IsMobilePhone, toBool } from '@joktec/core';
import { PropOptionsForString } from '@typegoose/typegoose/lib/types';
import { isArray, isNumber, isObject, omit } from 'lodash';
import { IsEmailOptions } from 'validator/lib/isEmail';
import { IPropOptions } from '../prop.decorator';

export type StringPropOptions = PropOptionsForString & {
  isEmail?: boolean | [boolean, string] | (IsEmailOptions & { message?: boolean });
  isPhone?: boolean | [boolean, string] | { locale?: string; strictMode?: boolean; message?: boolean };
};

export function StringProps(opts: IPropOptions, isArrayType: boolean): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];

  decorators.push(IsString({ each: isArrayType }));

  if (opts.minlength) {
    const minLength = isNumber(opts.minlength) ? [isNumber(opts.minlength)] : opts.minlength;
    const validatorOption: ValidationOptions = { each: isArrayType };
    if (minLength[1]) validatorOption.message = minLength[1];
    decorators.push(MinLength(minLength[0], validatorOption));
  }

  if (opts.maxlength) {
    const maxLength = isNumber(opts.maxlength) ? [isNumber(opts.maxlength)] : opts.maxlength;
    const validatorOption: ValidationOptions = { each: isArrayType };
    if (maxLength[1]) validatorOption.message = maxLength[1];
    decorators.push(MaxLength(maxLength[0], validatorOption));
  }

  if (opts.isEmail) {
    const emailOption: any = isArray(opts.isEmail)
      ? { message: opts.isEmail[1] }
      : isObject(opts.isEmail)
      ? opts.isEmail
      : {};
    decorators.push(
      IsEmail(omit(emailOption), {
        each: isArrayType,
        message: emailOption.message || 'Invalid email format',
      }),
    );
  }

  if (opts.isPhone) {
    const phoneOption: any = isArray(opts.isPhone)
      ? { message: opts.isEmail[1] }
      : isObject(opts.isEmail)
      ? opts.isEmail
      : {};
    const strictMode = toBool(phoneOption.strictMode, true);
    decorators.push(
      IsMobilePhone(
        phoneOption.locale,
        { strictMode },
        { each: isArrayType, message: phoneOption.message || 'Invalid phone number format' },
      ),
    );
  }

  return decorators;
}
