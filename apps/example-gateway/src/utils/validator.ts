import { applyDecorators, IsStrongPasswordOptions, linkTransform, Transform } from '@joktec/core';
import { isArray, isFunction } from 'lodash';
import { appConfig } from '../app.config';

export const PASSWORD_OPTIONS: IsStrongPasswordOptions = {
  minLength: 6,
  minLowercase: 0,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
};

function getHost(host: string | (() => string) | [(...args: any[]) => string, ...args: any[]]): string {
  if (isFunction(host)) return host();
  if (isArray(host)) {
    const [callback, ...args] = host;
    return callback(args);
  }
  return host || appConfig.misc.cdnUrl;
}

export const IsCdnUrl = (
  host?: string | (() => string) | [(...args: any[]) => string, ...args: any[]],
): PropertyDecorator => {
  return applyDecorators(
    Transform(
      ({ value }) => {
        if (isArray(value)) return value.map(item => linkTransform(item, getHost(host), 'relative'));
        return linkTransform(value, getHost(host), 'relative');
      },
      { toClassOnly: true },
    ),
    Transform(
      ({ value }) => {
        if (isArray(value)) return value.map(item => linkTransform(item, getHost(host), 'absolute'));
        return linkTransform(value, getHost(host), 'absolute');
      },
      { toPlainOnly: true },
    ),
  );
};
