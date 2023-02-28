import { isBoolean, isNaN, isArray, isEmpty, isString } from 'lodash';

export const getEnv = (key: string): string => {
  if (isEmpty(process.env[key] as string)) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return process.env[key] as string;
};

export const getEnvOptional = (key: string): string => process.env[key] as string;

export const toNumber = (value: string): number => parseInt(value, 10);

export const toInteger = (value: string): number => {
  if (isNaN(parseInt(value, 10))) {
    return 0;
  }
  return parseInt(value, 10);
};

export const toInt = (n: number | string | boolean, def: number = 0): number => {
  if (isNil(n)) return def;
  if (typeof n === 'string' && isNaN(parseInt(n, 10))) return def;
  if (isBoolean(n)) return n ? 1 : 0;
  if (n === 'true') return 1;
  if (n === 'false') return 0;
  return n ? parseInt(String(n), 10) : def;
};

export const toBool = (b: boolean | string | number | Buffer, def = false) => {
  if (!b) return def;
  if (b instanceof Buffer) return b.length && b[0] === 1;
  const value = String(b).toLowerCase();
  return value === 'yes' || value === 'true' || value === '1';
};

export const toArray = <T>(data: T | Array<T>, separator?: string): T[] => {
  if (!data) return [];
  if (isString(data) && separator) {
    return data.split(separator) as Array<T>;
  }
  return isArray(data) ? data : [data];
};

export const isNull = (value: any): boolean => value === null || value === 'null';

export const isUndefined = (value: any): boolean => value === undefined || value === 'undefined';

export const isNil = (value: any): boolean => isNull(value) || isUndefined(value);

// export const isEmpty = (value: any): boolean => isNil(value) || value === '';

export const isValidInt = (value: any): boolean => toInteger(value) !== 0;

export const normalizePort = (port: string): string | number | boolean => {
  const parsedPort = parseInt(port, 10);
  if (Number.isNaN(parsedPort)) return port;
  return parsedPort >= 0 ? parsedPort : false;
};

export const isDev = (): boolean => ['test', 'staging', 'production'].indexOf(process.env.NODE_ENV as string) === -1;

export const isTest = (): boolean => process.env.NODE_ENV === 'test';

export const isStaging = (): boolean => process.env.NODE_ENV === 'staging';

export const isProduction = (): boolean => process.env.NODE_ENV === 'production';

export const generateOTP = (otpLength: number = 6) => {
  const baseNumber = Math.pow(10, otpLength - 1);
  let number = Math.floor(Math.random() * baseNumber);
  if (number < baseNumber) {
    number += baseNumber;
  }
  return number;
};

export const snakeToCamel = (str: string) =>
  str.toLowerCase().replace(/([-_][a-z])/g, (group: string) => group.toUpperCase().replace('-', '').replace('_', ''));

export const sleep = async (n: number) => {
  return n ? new Promise<void>(resolve => setTimeout(resolve, n)) : undefined;
};

export const linkTransform = (link: string, host: string, type: 'relative' | 'absolute' = 'relative'): string => {
  if (link && type === 'relative') return link.replace(host, '');
  if (link && type === 'absolute' && !link.startsWith('http')) return new URL(link, host).toString();
  return link;
};

export * from './error-handler';
export * from './error';
export * from './express';
export * from './logger';
export * from './mongoose';
export * from './convert';
