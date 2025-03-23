import { describe, expect, it, test } from '@jest/globals';
import { generateOTP, generateUUID, getTimeString, hashPassword, hashString, matchPassword, rand } from '../generator';
import bcrypt from 'bcryptjs';

describe('rand function', () => {
  test('should return a number between min and max', () => {
    const randNum = rand(1, 10);
    expect(typeof randNum).toBe('number');
    expect(randNum).toBeGreaterThanOrEqual(1);
    expect(randNum).toBeLessThanOrEqual(10);
  });
});

describe('generateOTP function', () => {
  it('should return an OTP of the specified length', () => {
    const length = 6;
    const otp = generateOTP(length);
    expect(otp).toHaveLength(length);
  });

  it('should return a string consisting of digits only', () => {
    const otp = generateOTP();
    expect(otp).toMatch(/^[0-9]+$/);
  });

  it('should throw error if length is negative', () => {
    expect(() => generateOTP(-1)).toThrow();
  });
});

describe('generateUUID function', () => {
  test('should return a unique uuid', () => {
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();
    expect(uuid1).not.toBe(uuid2);
  });

  test('should return a uuid without prefix', () => {
    const uuid = generateUUID();
    expect(typeof uuid).toBe('string');
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  test('should return a prefixed uuid', () => {
    const uuid = generateUUID({ prefix: 'test' });
    expect(typeof uuid).toBe('string');
    expect(uuid).toMatch(/^TEST-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  test('should return a prefixed uuid with uppercase', () => {
    const uuid = generateUUID({ prefix: 'TEST' });
    expect(typeof uuid).toBe('string');
    expect(uuid).toMatch(/^TEST-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  test('should return a prefixed uuid with snake case', () => {
    const uuid = generateUUID({ prefix: 'test-case' });
    expect(typeof uuid).toBe('string');
    expect(uuid).toMatch(/^TEST_CASE-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  test('should return a prefixed uuid with snake case and uppercase', () => {
    const uuid = generateUUID({ prefix: 'TEST-CASE' });
    expect(typeof uuid).toBe('string');
    expect(uuid).toMatch(/^TEST_CASE-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });
});

describe('hashString function', () => {
  test('should return a unique uuid', () => {
    const uuid1 = hashString();
    const uuid2 = hashString();
    expect(uuid1).not.toEqual(uuid2);
  });

  test('should return a same uuid', () => {
    const uuid1 = hashString('Some test');
    const uuid2 = hashString('Some test');
    expect(uuid1).toEqual(uuid2);
  });

  test('should return a same uuid with scope', () => {
    const uuid1 = hashString('Some test', 'scope');
    const uuid2 = hashString('Some test', 'SCOPE');
    expect(uuid1).toEqual(uuid2);
  });

  test('should return a different uuid', () => {
    const uuid1 = hashString('Some test 1');
    const uuid2 = hashString('Some test 2');
    expect(uuid1).not.toEqual(uuid2);
  });

  test('should return a uuid without prefix', () => {
    const uuid = hashString();
    expect(typeof uuid).toBe('string');
    expect(uuid).toMatch(/^[0-9a-fA-F]{1,8}-[0-9a-fA-F]{1,4}-[0-9a-fA-F]{1,4}-[0-9a-fA-F]{1,4}-[0-9a-fA-F]{1,12}$/);
  });
});

describe('hashPassword', () => {
  test('should hash the password correctly', () => {
    const password = 'myPassword123';
    const actualHash = hashPassword(password);
    const actualResult = bcrypt.compareSync(password, actualHash);
    expect(typeof actualHash).toBe('string');
    expect(actualResult).toBe(true);
  });

  it('should throw an error if no password is provided', () => {
    expect(() => hashPassword('')).toThrow();
  });
});

describe('matchPassword', () => {
  it('should return true if the passwords match', () => {
    const password = 'myPassword123';
    const hash = bcrypt.hashSync(password, 12);
    const result = matchPassword(password, hash);
    expect(result).toBe(true);
  });

  it('should return false if the passwords do not match', () => {
    const password = 'myPassword123';
    const hash = bcrypt.hashSync('wrongPassword', 12);
    const result = matchPassword(password, hash);
    expect(result).toBe(false);
  });
});

describe('getTimeString function', () => {
  it('should return the duration in milliseconds when duration is less than 1500ms', () => {
    const duration = 1000;
    const result = getTimeString(duration);
    expect(result).toEqual('1000 ms');
  });

  it('should return the duration in seconds with two decimal places when duration is greater than or equal to 1500ms', () => {
    const duration = 2000;
    const result = getTimeString(duration);
    expect(result).toEqual('2.00 s');
  });

  it('should return the duration in milliseconds when duration is 0', () => {
    const duration = 0;
    const result = getTimeString(duration);
    expect(result).toEqual('0 ms');
  });

  it('should return the duration in milliseconds when duration is negative', () => {
    const duration = -500;
    const result = getTimeString(duration);
    expect(result).toEqual('-500 ms');
  });

  it('should return the duration in seconds with two decimal places when duration is negative and less than 1500ms', () => {
    const duration = -2000;
    const result = getTimeString(duration);
    expect(result).toEqual('-2.00 s');
  });

  it('should return the duration in milliseconds when duration is 100ms', () => {
    const duration = 100;
    const result = getTimeString(duration);
    expect(result).toEqual('100 ms');
  });

  it('should return the duration in seconds when duration is 1000ms', () => {
    const duration = 1000;
    const result = getTimeString(duration);
    expect(result).toEqual('1000 ms');
  });

  it('should return the duration in seconds when duration is 50000ms', () => {
    const duration = 50000;
    const result = getTimeString(duration);
    expect(result).toEqual('50.00 s');
  });

  it('should return the duration in hours when duration is 3600000ms', () => {
    const duration = 3600000;
    const result = getTimeString(duration);
    expect(result).toEqual('1.00 h');
  });

  it('should return the duration in days when duration is 86400000ms', () => {
    const duration = 86400000;
    const result = getTimeString(duration);
    expect(result).toEqual('1.00 d');
  });

  it('should return the duration in weeks when duration is 604800000ms', () => {
    const duration = 604800000;
    const result = getTimeString(duration);
    expect(result).toEqual('1.00 w');
  });

  it('should return the duration in months when duration is 2592000000ms', () => {
    const duration = 2592000000;
    const result = getTimeString(duration);
    expect(result).toEqual('1.00 mo');
  });

  it('should return the duration in years when duration is 31536000000ms', () => {
    const duration = 31536000000;
    const result = getTimeString(duration);
    expect(result).toEqual('1.00 y');
  });

  it('should return the duration in years when duration is large (example: 10 years)', () => {
    const duration = 31536000000 * 10; // 10 years
    const result = getTimeString(duration);
    expect(result).toEqual('10.00 y');
  });

  it('should handle negative duration in months correctly', () => {
    const duration = -2592000000;
    const result = getTimeString(duration);
    expect(result).toEqual('-1.00 mo');
  });
});
