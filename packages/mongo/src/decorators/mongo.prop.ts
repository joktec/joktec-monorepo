import { linkTransform } from '@joktec/core';
import { prop } from '@typegoose/typegoose';
import { BasePropOptions } from '@typegoose/typegoose/lib/types';
import { PropType } from '@typegoose/typegoose/lib/internal/constants';

export const propUrl = (options?: BasePropOptions & { host?: string }, kind?: PropType): PropertyDecorator => {
  const host = options?.host || process.env.MISC_CDN_URL || '';
  return prop(
    {
      default: null,
      type: String,
      get: (value: string) => linkTransform(value, host, 'relative'),
      set: (value: string) => linkTransform(value, host, 'absolute'),
      ...options,
    },
    kind,
  );
};
