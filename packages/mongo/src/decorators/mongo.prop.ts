import { applyDecorators, linkTransform } from '@joktec/core';
import { prop, PropType } from '@typegoose/typegoose';
import { BasePropOptions } from '@typegoose/typegoose/lib/types';
import { isArray } from 'lodash';

export const propUrl = (
  options?: BasePropOptions & { host?: string },
  kind: PropType = PropType.NONE,
): PropertyDecorator => {
  return applyDecorators(
    prop(
      {
        type: String,
        set: (value: string | string[]): string | string[] => {
          const host = options?.host || process.env.MISC_CDN_URL;
          if (isArray(value)) return value.map(item => linkTransform(item, host, 'relative'));
          return linkTransform(value, host, 'relative');
        },
        get: (value: string | string[]): string | string[] => {
          const host = options?.host || process.env.MISC_CDN_URL;
          if (isArray(value)) return value.map(item => linkTransform(item, host, 'absolute'));
          return linkTransform(value, host, 'absolute');
        },
        ...options,
      },
      kind,
    ),
  );
};
