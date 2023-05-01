import { applyDecorators } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsUrl, ValidationOptions } from 'class-validator';
import { linkTransform } from '../utils';

export const isCountryCode = (value: string): boolean => {
  return /^\+[0-9]{1,3}$/.test(value);
};

export const isPhone = (value: any): boolean => {
  return /^[1-9][0-9]{8}$/.test(value);
};

export const isOtp = (value: string): boolean => {
  return /^\+[0-9]{6}$/.test(value);
};

export const IsCdnUrl = (options?: ValidationOptions & { host?: string }): PropertyDecorator => {
  return applyDecorators(
    Type(() => String),
    IsUrl({ protocols: ['http', 'https', ''] }, options),
    Transform(({ value }) => linkTransform(value, options?.host || process.env.MISC_CDN_URL, 'relative'), {
      toClassOnly: true,
    }),
    Transform(({ value }) => linkTransform(value, options?.host || process.env.MISC_CDN_URL, 'absolute'), {
      toPlainOnly: true,
    }),
  );
};
