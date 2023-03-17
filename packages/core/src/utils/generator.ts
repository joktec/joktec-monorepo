import { range } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

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

export const cloneInstance = <T extends object>(origin: Partial<T>, addition: Partial<T> = {}): T => {
  return Object.assign(Object.create(Object.getPrototypeOf(origin)), origin, addition);
};

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 12);
};

export const matchPassword = (password: string, hashPassword: string): boolean => {
  return bcrypt.compareSync(password, hashPassword);
};
