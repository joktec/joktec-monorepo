import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { range, snakeCase } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

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
  if (otpLength === 0) return null;
  const length = Math.abs(otpLength);
  const otp = range(otpLength).map(_ => rand(0, 9));
  return length > 0 ? otp.join('') : otp.reverse().join('');
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
  if (!password) throw new Error('PASSWORD_REQUIRED');
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
 * Converts a duration time (in milliseconds) to a formatted display string,
 * including appropriate units based on the size of the duration.
 * @param duration - The duration time in milliseconds.
 * @returns The formatted display string representing the duration.
 */
export const getTimeString = (duration: number): string => {
  const absDuration = Math.abs(duration);
  if (absDuration < 1500) return `${duration} ms`;

  const timeUnits = [
    { unit: 'ms', value: 1 },
    { unit: 's', value: 1000 },
    { unit: 'min', value: 60 * 1000 },
    { unit: 'h', value: 60 * 60 * 1000 },
    { unit: 'd', value: 24 * 60 * 60 * 1000 },
    { unit: 'w', value: 7 * 24 * 60 * 60 * 1000 },
    { unit: 'mo', value: 30 * 24 * 60 * 60 * 1000 }, // 1 tháng = 30 ngày
    { unit: 'y', value: 365 * 24 * 60 * 60 * 1000 }, // 1 năm = 365 ngày
  ];

  for (let i = timeUnits.length - 1; i >= 0; i--) {
    const { unit, value } = timeUnits[i];
    const timeInUnit = duration / value;
    if (absDuration >= value) {
      return `${timeInUnit.toFixed(2)} ${unit}`;
    }
  }

  return `${duration} ms`;
};

/**
 * Truncate text to a specified maximum length and add an ellipsis if truncated.
 * @param text - The input text to be truncated.
 * @param maxLength - The maximum length of the truncated text (default: 80 characters).
 * @returns The truncated text with an ellipsis if truncated, or the original text if not.
 */
export const truncateText = (text: string, maxLength = 80): string => {
  const max = maxLength - 3;
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, max) + '...';
};
