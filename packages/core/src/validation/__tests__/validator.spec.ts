import { describe, expect, it } from '@jest/globals';
import { buildError } from '../validation.utils';

describe('buildError function', () => {
  it('should correctly build error object for flat errors array', () => {
    const errors = [
      { property: 'username', constraints: { maxLength: 'Username must be no more than 20 characters' } },
      { property: 'email', constraints: { isEmail: 'Email must be a valid email address' } },
    ];
    const result = buildError(errors);
    expect(result).toEqual({
      username: ['Username must be no more than 20 characters'],
      email: ['Email must be a valid email address'],
    });
  });

  it('should correctly build error object for nested errors array', () => {
    const errors = [
      {
        property: 'address',
        children: [
          { property: 'street', constraints: { maxLength: 'Street must be no more than 50 characters' } },
          { property: 'city', constraints: { maxLength: 'City must be no more than 30 characters' } },
        ],
      },
      { property: 'email', constraints: { isEmail: 'Email must be a valid email address' } },
    ];
    const result = buildError(errors);
    expect(result).toEqual({
      'address.street': ['Street must be no more than 50 characters'],
      'address.city': ['City must be no more than 30 characters'],
      email: ['Email must be a valid email address'],
    });
  });

  it('should correctly build error object for errors with no constraints', () => {
    const errors = [
      { property: 'username', constraints: null },
      { property: 'email', constraints: { isEmail: 'Email must be a valid email address' } },
    ];
    const result = buildError(errors);
    expect(result).toEqual({
      email: ['Email must be a valid email address'],
    });
  });

  it('should correctly build error object for nested errors with no constraints', () => {
    const errors = [
      {
        property: 'address',
        children: [
          { property: 'street', constraints: null },
          { property: 'city', constraints: { maxLength: 'City must be no more than 30 characters' } },
        ],
      },
      { property: 'email', constraints: { isEmail: 'Email must be a valid email address' } },
    ];
    const result = buildError(errors);
    expect(result).toEqual({
      'address.city': ['City must be no more than 30 characters'],
      email: ['Email must be a valid email address'],
    });
  });

  it('should correctly build error object for nested errors with no children', () => {
    const errors = [
      { property: 'address', children: null },
      { property: 'email', constraints: { isEmail: 'Email must be a valid email address' } },
    ];
    const result = buildError(errors);
    expect(result).toEqual({
      email: ['Email must be a valid email address'],
    });
  });
});
