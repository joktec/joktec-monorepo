import { describe, expect, it } from '@jest/globals';
import { isClass } from '../validator';

class MyClass {
  private constructor() {}
}

describe('isClass function', () => {
  it('should detect MyClass is class and return true', () => {
    const result = isClass(MyClass);
    expect(result).toEqual(true);
  });

  it('should detect anonymous function is not class and return false', () => {
    const myFunction = () => {};
    const result = isClass(myFunction);
    expect(result).toEqual(false);
  });

  it('should detect function is not class and return false', () => {
    const myFunction = function abc() {};
    const result = isClass(myFunction);
    expect(result).toEqual(false);
  });
});
