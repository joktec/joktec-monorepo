import { isBoolean, isNil, isNaN, isArray, isEmpty } from 'lodash';

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

export const toBool = (b: boolean | string | number, def = false) => {
  if (!b) return def;
  const value = String(b).toLowerCase();
  return value === 'yes' || value === 'true' || value === '1';
};

export const toArray = <T>(data: T | Array<T>): T[] => {
  if (!data) return [];
  return isArray(data) ? data : [data];
};

export const isNull = (value: string) => value === 'null' || value === null;

export const isUndefined = (value: string): boolean => value === undefined || value === 'undefined';

// export const isEmpty = (value: string): boolean => isUndefined(value) || isNull(value) || value === '';

// export const isString = (value: any) => typeof value === 'string';

// export const isNumber = (value: any) => typeof value === 'number';

export const isValidInt = (value: any): boolean => toInteger(value) !== 0;

export const normalizePort = (port: string): string | number | boolean => {
  const parsedPort = parseInt(port, 10);
  if (Number.isNaN(parsedPort)) {
    return port;
  }
  if (parsedPort >= 0) {
    return parsedPort;
  }
  return false;
};

export const isDev = (): boolean => {
  return ['test', 'staging', 'production'].indexOf(process.env.NODE_ENV as string) === -1;
};

export const isTest = (): boolean => {
  return process.env.NODE_ENV === 'test';
};

export const isStaging = (): boolean => {
  return process.env.NODE_ENV === 'staging';
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

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

export * from './error-handler';
export * from './error';
export * from './express';
// export * from './jwt'
export * from './logger';
export * from './mongoose';
export * from './convert';
export * from './deep-merge';
