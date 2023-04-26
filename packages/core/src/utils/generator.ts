import { range, snakeCase } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { InternalServerException } from '../exceptions';

/**
 * Create a random number between min and max
 * @param min
 * @param max
 */
export const rand = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Generate a random OTP Code with specific length
 * @param otpLength
 */
export const generateOTP = (otpLength: number = 6): string => {
  if (otpLength <= 0) throw new InternalServerException('OTP_LENGTH_MUST_BE_GREATER_THAN_ZERO');
  return range(otpLength)
    .map(_ => rand(0, 9))
    .join('');
};

/**
 * Generate a UUID with prefix
 * @param opts
 */
export const generateUUID = (opts?: { prefix?: string }): string => {
  let result: string = uuidv4();
  if (opts?.prefix) {
    const prefix = snakeCase(opts.prefix).toUpperCase();
    result = `${prefix}-${result}`;
  }
  return result;
};

export const cloneInstance = <T extends object>(origin: Partial<T>, addition: Partial<T> = {}): T => {
  return Object.assign(Object.create(Object.getPrototypeOf(origin)), origin, addition);
};

/**
 * Hash a password
 * @param password
 * @param salt
 */
export const hashPassword = (password: string, salt: number = 12): string => {
  if (!password) throw new InternalServerException('PASSWORD_REQUIRED');
  return bcrypt.hashSync(password, salt);
};

/**
 * Match a password with hash password
 * @param password
 * @param hashPassword
 */
export const matchPassword = (password: string, hashPassword: string): boolean => {
  return bcrypt.compareSync(password, hashPassword);
};
