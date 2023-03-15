import { range } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const rand = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export const generateOTP = (otpLength: number = 6) => {
  return range(otpLength)
    .map(_ => rand(0, 9))
    .join('');
};

export const generateUUID = (options?: { prefix?: string }): string => {
  let result: string = uuidv4();
  if (options?.prefix) result = `${options.prefix}_${result}`;
  return result;
};
