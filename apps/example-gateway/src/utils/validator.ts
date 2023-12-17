import { applyDecorators, IsStrongPasswordOptions, linkTransform, Transform, ValidationOptions } from '@joktec/core';
import { isArray } from 'lodash';

export const ValidateGroup = {
  HOOK: 'hook',
};

export const PASSWORD_OPTIONS: IsStrongPasswordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};

export const IsCdnUrl = (options?: ValidationOptions & { host?: string }): PropertyDecorator => {
  return applyDecorators(
    // IsUrl({ protocols: ['http', 'https', ''] }, options),
    Transform(
      ({ value }) => {
        const host = options?.host || process.env.MISC_CDN_URL;
        if (isArray(value)) return value.map(item => linkTransform(item, host, 'relative'));
        return linkTransform(value, host, 'relative');
      },
      { toClassOnly: true },
    ),
    Transform(
      ({ value }) => {
        const host = options?.host || process.env.MISC_CDN_URL;
        if (isArray(value)) return value.map(item => linkTransform(item, host, 'absolute'));
        return linkTransform(value, host, 'absolute');
      },
      { toPlainOnly: true },
    ),
  );
};
