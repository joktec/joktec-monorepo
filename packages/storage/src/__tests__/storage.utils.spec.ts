import { describe, expect, it } from '@jest/globals';
import { parseKey } from '../storage.utils';

describe('parseKey function', () => {
  it('should parse the object key from a link that starts with https://', () => {
    const link = 'https://my-bucket.s3.amazonaws.com/my-folder/my-object.txt';
    const bucket = 'my-bucket';
    const expectedKey = 'my-folder/my-object.txt';
    expect(parseKey(link, bucket)).toEqual(expectedKey);
  });

  it('should parse the object key from a link that starts with http://', () => {
    const link = 'http://my-bucket.s3.amazonaws.com/my-folder/my-object.txt';
    const bucket = 'my-bucket';
    const expectedKey = 'my-folder/my-object.txt';
    expect(parseKey(link, bucket)).toEqual(expectedKey);
  });

  it('should parse the object key from a link that does not include a protocol', () => {
    const link = 'my-folder/my-object.txt';
    const expectedKey = 'my-folder/my-object.txt';
    expect(parseKey(link)).toEqual(expectedKey);
  });

  it('should parse the object key from a link that contains the bucket name', () => {
    const link = 'my-bucket/my-folder/my-object.txt';
    const bucket = 'my-bucket';
    const expectedKey = 'my-folder/my-object.txt';
    expect(parseKey(link, bucket)).toEqual(expectedKey);
  });

  it('should parse the object key from a link that contains the bucket name and extra slashes', () => {
    const link = 'my-bucket///my-folder/my-object.txt';
    const bucket = 'my-bucket';
    const expectedKey = 'my-folder/my-object.txt';
    expect(parseKey(link, bucket)).toEqual(expectedKey);
  });

  it('should throw a TypeError if the link argument is not a string', () => {
    const link = null;
    const bucket = 'my-bucket';
    expect(() => parseKey(link, bucket)).toThrowError(TypeError);
  });
});
