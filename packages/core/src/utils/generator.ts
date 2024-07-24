import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { range, snakeCase } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { InternalServerException } from '../exceptions';
import { DeepPartial, Entity } from '../models';

/**
 * Create a random number between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number} Random number
 */
export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
 * @param {object} opts
 * @returns {string} UUID
 */
export function generateUUID(opts?: { prefix?: string; empty?: boolean }): string {
  if (opts?.empty) return '00000000-0000-0000-0000-000000000000';
  let result: string = uuidv4();
  if (opts?.prefix) {
    const prefix = snakeCase(opts.prefix).toUpperCase();
    result = `${prefix}-${result}`;
  }
  return result;
}

export const cloneInstance = <T extends Entity>(origin: DeepPartial<T>, addition: DeepPartial<T> = {}): T => {
  return Object.assign(Object.create(Object.getPrototypeOf(origin)), origin, addition);
};

/**
 * Hash a string (with scope)
 * @param {string | number} target
 * @param {string} scope
 * @returns {string} A hash string
 */
export function hashString(target: string | number = uuidv4(), scope: string = 'DEFAULT'): string {
  const upperScope: string = snakeCase(scope).toUpperCase();
  const content = `${target}@${upperScope}`;
  const hashStatus: string = crypto.createHash('md5').update(content, 'utf8').digest('hex');
  return [
    hashStatus.substring(0, 8),
    hashStatus.substring(8, 12),
    hashStatus.substring(14, 18),
    hashStatus.substring(19, 23),
    hashStatus.substring(24, 36),
  ].join('-');
}

/**
 * Hash a password (with salt)
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
