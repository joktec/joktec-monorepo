import { describe, expect, it, test } from '@jest/globals';
import { generateOTP, generateUUID, hashPassword, matchPassword, rand } from '../generator';
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
