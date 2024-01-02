import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  ValidationOptions,
  IsMobilePhone,
  toBool,
  IsHexColor,
  isMobilePhone,
  isEmail,
  IsUrl,
} from '@joktec/core';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { PropOptionsForString } from '@typegoose/typegoose/lib/types';
import { isArray, isNil, isNumber, isObject } from 'lodash';
import { IsEmailOptions } from 'validator/lib/isEmail';
import { IPropOptions } from '../prop.decorator';

export interface StringPropOptions extends PropOptionsForString {
  i18n?: boolean;
  slug?: string;
  isEmail?: boolean | [boolean, string] | (IsEmailOptions & { message?: boolean });
  isPhone?: boolean | [boolean, string] | { locale?: string; strictMode?: boolean; message?: boolean };
  isHexColor?: boolean | [boolean, string];
  isUrl?: boolean | [boolean, string];
}

export function StringProps(opts: IPropOptions, swagger: ApiPropertyOptions): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];

  decorators.push(IsString({ each: swagger.isArray }));

  if (!isNil(opts.minlength)) {
    const minLength = isNumber(opts.minlength) ? [isNumber(opts.minlength)] : opts.minlength;
    const validatorOption: ValidationOptions = { each: swagger.isArray };
    if (minLength[1]) validatorOption.message = minLength[1];
    decorators.push(MinLength(minLength[0], validatorOption));
    swagger.minLength = minLength[0];
  }

  if (!isNil(opts.maxlength)) {
    const maxLength = isNumber(opts.maxlength) ? [isNumber(opts.maxlength)] : opts.maxlength;
    const validatorOption: ValidationOptions = { each: swagger.isArray };
    if (maxLength[1]) validatorOption.message = maxLength[1];
    decorators.push(MaxLength(maxLength[0], validatorOption));
    swagger.maxLength = maxLength[0];
  }

  if (opts.isEmail) {
    const defMsg = '$property is an invalid email format';
    const emailOption: any = isArray(opts.isEmail)
      ? { message: opts.isEmail[1] || defMsg }
      : isObject(opts.isEmail)
      ? opts.isEmail
      : {};
    decorators.push(IsEmail(emailOption, { each: swagger.isArray, message: emailOption.message }));
    swagger.format = 'email';
    opts.validate = (v: string) => isNil(v) || isEmail(v, emailOption);
  }

  if (opts.isPhone) {
    const defMsg = '$property is an invalid phone number format';
    const phoneOption: any = isArray(opts.isPhone)
      ? { message: opts.isEmail[1] || defMsg }
      : isObject(opts.isEmail)
      ? opts.isEmail
      : {};
    const strictMode = toBool(phoneOption.strictMode, true);
    decorators.push(
      IsMobilePhone(phoneOption.locale, { strictMode }, { each: swagger.isArray, message: phoneOption.message }),
    );
    opts.validate = (v: string) => isNil(v) || isMobilePhone(v, phoneOption.locale);
  }

  if (opts.isHexColor) {
    const defMsg = '$property must be a hex color';
    const hexOption: any = isArray(opts.isHexColor) ? { message: opts.isHexColor[1] || defMsg } : {};
    decorators.push(IsHexColor({ each: swagger.isArray, message: hexOption.message }));
  }

  if (opts.isUrl) {
    const defMsg = '$property must be a url';
    const urlOption: any = isArray(opts.isUrl) ? { message: opts.isUrl[1] || defMsg } : {};
    decorators.push(IsUrl({}, { each: swagger.isArray, message: urlOption.message }));
  }

  return decorators;
}
