import { linkTransform } from '@joktec/core';
import { prop, PropType } from '@typegoose/typegoose';
import { BasePropOptions } from '@typegoose/typegoose/lib/types';

export const propUrl = (options?: BasePropOptions & { host?: string }, kind?: PropType): PropertyDecorator => {
  const host = options?.host || process.env.MISC_CDN_URL || '';
  const isArray: boolean = kind === PropType.ARRAY;
  const getter = (value: string | string[]): string | string[] => {
    if (Array.isArray(value)) {
      return value.map(v => linkTransform(v, host, 'relative'));
    }
    return linkTransform(value, host, 'relative');
  };
  const setter = (value: string | string[]): string | string[] => {
    if (Array.isArray(value)) {
      return value.map(v => linkTransform(v, host, 'absolute'));
    }
    return linkTransform(value, host, 'absolute');
  };
  return prop({ default: isArray ? [] : null, type: String, get: getter, set: setter, ...options }, kind);
};
