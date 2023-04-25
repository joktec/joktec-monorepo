import { describe, expect, it } from '@jest/globals';
import {
  flattenKeys,
  joinUrl,
  linkTransform,
  objectToQueryString,
  toArray,
  toBool,
  toInt,
  toSlugify,
} from '../convert';

describe('flattenKeys function', () => {
  it('should return an empty array for an empty object', () => {
    expect(flattenKeys({})).toEqual([]);
  });

  it('should return an array with a single key for a flat object', () => {
    const obj = { foo: 'bar' };
    expect(flattenKeys(obj)).toEqual(['foo']);
  });

  it('should return an array with multiple keys for a flat object', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    expect(flattenKeys(obj)).toEqual(['foo', 'baz']);
  });

  it('should return an array with dot-separated keys for a nested object', () => {
    const obj = { foo: { bar: 'baz', qux: 'quux' } };
    expect(flattenKeys(obj)).toEqual(['foo.bar', 'foo.qux']);
  });

  it('should return an array with dot-separated keys for a nested object with multiple levels', () => {
    const obj = { foo: { bar: { baz: 'qux' } } };
    expect(flattenKeys(obj)).toEqual(['foo.bar.baz']);
  });

  it('should return an array with dot-separated keys for an array of objects', () => {
    const obj = [{ foo: 'bar' }, { baz: 'qux' }];
    expect(flattenKeys(obj)).toEqual(['0.foo', '1.baz']);
  });

  it('should return an array with dot-separated keys for a nested object inside an array', () => {
    const obj = [{ foo: { bar: 'baz' } }, { qux: 'quux' }];
    expect(flattenKeys(obj)).toEqual(['0.foo.bar', '1.qux']);
  });

  it('should return an array with dot-separated keys for a mixed object with arrays and nested objects', () => {
    const obj = {
      foo: { bar: ['baz', { qux: 'quux' }] },
      baz: [{ qux: 'quux' }],
    };
    expect(flattenKeys(obj)).toEqual(['foo.bar.0', 'foo.bar.1.qux', 'baz.0.qux']);
  });

  it('should handle null and undefined values in the object', () => {
    const obj = { foo: null, bar: undefined };
    expect(flattenKeys(obj)).toEqual(['foo', 'bar']);
  });

  it.skip('should handle an object with circular references', () => {
    const obj: any = { foo: 'bar' };
    obj.baz = obj;
    expect(flattenKeys(obj)).toEqual(['foo', 'baz']);
  });
});

describe('toInt function', () => {
  it('should convert a number to an integer', () => {
    expect(toInt(42)).toEqual(42);
  });

  it('should convert a string that can be converted to a number to an integer', () => {
    expect(toInt('42')).toEqual(42);
  });

  it('should convert a string that cannot be converted to a number to 0', () => {
    expect(toInt('not a number')).toEqual(0);
  });

  it('should convert a boolean true value to 1', () => {
    expect(toInt(true)).toEqual(1);
  });

  it('should convert a boolean false value to 0', () => {
    expect(toInt(false)).toEqual(0);
  });

  it("should convert the string 'true' to 1", () => {
    expect(toInt('true')).toEqual(1);
  });

  it("should convert the string 'false' to 0", () => {
    expect(toInt('false')).toEqual(0);
  });

  it('should return the default value when the input value is null', () => {
    expect(toInt(null, 42)).toEqual(42);
  });

  it('should return the default value when the input value is undefined', () => {
    expect(toInt(undefined, 42)).toEqual(42);
  });

  it('should return the default value when no input value is provided', () => {
    expect(toInt(undefined, 42)).toEqual(42);
  });
});

describe('toBool function', () => {
  it('should return true for true boolean input', () => {
    expect(toBool(true)).toBe(true);
  });

  it('should return false for false boolean input', () => {
    expect(toBool(false)).toBe(false);
  });

  it('should return true for string input of "true"', () => {
    expect(toBool('true')).toBe(true);
  });

  it('should return true for number input of 1', () => {
    expect(toBool(1)).toBe(true);
  });

  it('should return false for null input with default value of false', () => {
    expect(toBool(null, false)).toBe(false);
  });
});

describe('toArray function', () => {
  it('should convert a non-array input to a single-element array', () => {
    expect(toArray('foo')).toEqual(['foo']);
  });

  it('should return an empty array for null input', () => {
    expect(toArray(null)).toEqual([]);
  });

  it('should return an empty array for undefined input', () => {
    expect(toArray(undefined)).toEqual([]);
  });

  it('should return an empty array for an empty array input', () => {
    expect(toArray([])).toEqual([]);
  });

  it('should return the input array as is', () => {
    expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe('linkTransform function', () => {
  it('should return an empty string if the input link is null or undefined', () => {
    expect(linkTransform(null, 'https://example.com')).toEqual(null);
    expect(linkTransform(undefined, 'https://example.com')).toEqual(undefined);
  });

  it('should transform a relative link to a link relative to the host', () => {
    expect(linkTransform('/page', 'https://example.com')).toEqual('/page');
    expect(linkTransform('https://example.com/page', 'https://example.com')).toEqual('/page');
    expect(linkTransform('https://example.com/page/child', 'https://example.com')).toEqual('/page/child');
  });

  it('should transform a relative link to an absolute link', () => {
    expect(linkTransform('/page', 'https://example.com', 'absolute')).toEqual('https://example.com/page');
    expect(linkTransform('page', 'https://example.com', 'absolute')).toEqual('https://example.com/page');
    expect(linkTransform('page/child', 'https://example.com', 'absolute')).toEqual('https://example.com/page/child');
  });

  it('should not transform an absolute link', () => {
    expect(linkTransform('https://example.com/page', 'https://example.com', 'relative')).toEqual('/page');
    expect(linkTransform('https://google.com', 'https://example.com', 'absolute')).toEqual('https://google.com');
  });
});

describe('toSlugify function', () => {
  it('should return null when no values are passed in', () => {
    const result = toSlugify();
    expect(result).toBeNull();
  });

  it('should return a lowercase string with hyphens', () => {
    const result = toSlugify('Hello World');
    expect(result).toEqual('hello-world');
  });

  it('should handle special characters', () => {
    const result = toSlugify('The quick brown fox', 'jumps over the lazy dog!');
    expect(result).toEqual('the-quick-brown-fox-jumps-over-the-lazy-dog');
  });

  it('should handle empty strings', () => {
    const result = toSlugify('', 'Hello', '', 'World', '');
    expect(result).toEqual('hello-world');
  });

  it('should handle non-string values', () => {
    const result = toSlugify('The answer is', 42);
    expect(result).toEqual('the-answer-is-42');
  });
});

describe('objectToQueryString function', () => {
  it('should return an empty string for empty object', () => {
    const query = objectToQueryString({});
    expect(query).toEqual('');
  });

  it('should generate a valid query string for object with single key-value pair', () => {
    const query = objectToQueryString({ foo: 'bar' });
    expect(query).toEqual('?foo=bar');
  });

  it('should generate a valid query string for object with multiple key-value pairs', () => {
    const query = objectToQueryString({ foo: 'bar', baz: 'qux' });
    expect(query).toEqual('?foo=bar&baz=qux');
  });

  it('should handle undefined and null values', () => {
    const query = objectToQueryString({ foo: undefined, bar: null, baz: 'qux' });
    expect(query).toEqual('?foo=&bar=&baz=qux');
  });

  it('should handle values with special characters', () => {
    const query = objectToQueryString({ foo: 'hello world', bar: 'hello@world' });
    expect(query).toEqual('?foo=hello%20world&bar=hello%40world');
  });
});

describe('joinUrl function', () => {
  // Test case 1: Test with no path or params
  it('should join URL with only host', () => {
    const host = 'https://example.com';
    const result = joinUrl(host);
    expect(result).toEqual('https://example.com');
  });

  // Test case 2: Test with single path
  it('should join URL with single path', () => {
    const host = 'https://example.com';
    const paths = ['path1'];
    const result = joinUrl(host, { paths });
    expect(result).toEqual('https://example.com/path1');
  });

  // Test case 3: Test with multiple paths
  it('should join URL with multiple paths', () => {
    const host = 'https://example.com';
    const paths = ['path1', 'path2', 'path3'];
    const result = joinUrl(host, { paths });
    expect(result).toEqual('https://example.com/path1/path2/path3');
  });

  // Test case 4: Test with query parameters
  it('should join URL with query parameters', () => {
    const host = 'https://example.com';
    const params = { key1: 'value1', key2: 'value2' };
    const result = joinUrl(host, { params });
    expect(result).toEqual('https://example.com?key1=value1&key2=value2');
  });

  // Test case 5: Test with both paths and query parameters
  it('should join URL with both paths and query parameters', () => {
    const host = 'https://example.com';
    const paths = ['path1', 'path2'];
    const params = { key1: 'value1', key2: 'value2' };
    const result = joinUrl(host, { paths, params });
    expect(result).toEqual('https://example.com/path1/path2?key1=value1&key2=value2');
  });
});
