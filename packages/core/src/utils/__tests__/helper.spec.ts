import { describe, expect, it, test } from '@jest/globals';
import { includes, sleep, someIncludes } from '../helper';

describe('sleep function', () => {
  it('should wait for the specified number of milliseconds', async () => {
    const start = Date.now();
    const delay = 100;
    await sleep(delay);
    const end = Date.now();
    const elapsed = end - start;
    expect(elapsed).toBeGreaterThanOrEqual(delay);
  });
});

describe('includes function', () => {
  it('should return true if all values are included in the array', () => {
    const array = [1, 2, 3];
    const values = [2, 3];
    const result = includes(array, ...values);
    expect(result).toBe(true);
  });

  it('should return false if any value is not included in the array', () => {
    const array = ['apple', 'banana', 'cherry'];
    const values = ['banana', 'kiwi'];
    const result = includes(array, ...values);
    expect(result).toBe(false);
  });

  it('should return false if either the array or values array is empty', () => {
    const array = [];
    const values = [1, 2, 3];
    const result = includes(array, ...values);
    expect(result).toBe(false);
  });
});

describe('someIncludes', () => {
  it('should return true if any value is included in the array', () => {
    const array = [1, 2, 3];
    const values = [2, 5];
    const result = someIncludes(array, ...values);
    expect(result).toBe(true);
  });

  it('should return false if none of the values are included in the array', () => {
    const array = ['apple', 'banana', 'cherry'];
    const values = ['orange', 'kiwi'];
    const result = someIncludes(array, ...values);
    expect(result).toBe(false);
  });

  it('should return false if either the array or values array is empty', () => {
    const array = [];
    const values = [1, 2, 3];
    const result = someIncludes(array, ...values);
    expect(result).toBe(false);
  });
});
