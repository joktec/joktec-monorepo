import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { range, snakeCase } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { InternalServerException } from '../exceptions';

/**
 * Create a random number between min and max
 * @param min
 * @param max
 */
export const rand = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Create a random string with md5
 * @param content
 */
export const md5 = (content: string) => {
  return crypto.createHash('md5').update(content, 'utf8').digest('hex');
};

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
 * Generate a UUID with scope
 * @param target
 * @param scope
 */
export const generateUUID = (target: string = uuidv4(), scope: string = 'DEFAULT'): string => {
  const upperScope: string = snakeCase(scope).toUpperCase();
  const hashStatus: string = md5(`${target}@${upperScope}`);
  return [
    hashStatus.substring(0, 8),
    hashStatus.substring(8, 12),
    hashStatus.substring(14, 18),
    hashStatus.substring(19, 23),
    hashStatus.substring(24, 36),
  ].join('-');
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

/**
 * Converts a duration time (in milliseconds) to a formatted display string, including both milliseconds and seconds.
 * @param duration - The duration time in milliseconds.
 * @returns The formatted display string representing the duration.
 */
export const getTimeString = (duration: number): string => {
  if (Math.abs(duration) >= 1500) {
    return `${(duration / 1000).toFixed(2)} s`;
  }
  return `${duration} ms`;
};
