import { describe, expect, it, jest } from '@jest/globals';
import { FileFilter, isAllowedMimeType } from '../file.pipe';
import { ExpressRequest } from '../../base';

describe('isAllowedMimeType function', () => {
  it('should return true for empty allowedMimeTypes array', () => {
    const result = isAllowedMimeType('image/png', []);
    expect(result).toBe(true);
  });

  it('should return true for exact match in allowedMimeTypes array', () => {
    const result = isAllowedMimeType('image/png', ['image/png']);
    expect(result).toBe(true);
  });

  it('should return true for wildcard match in allowedMimeTypes array', () => {
    const result = isAllowedMimeType('image/png', ['image/*']);
    expect(result).toBe(true);
  });

  it('should return false for non-matching mimeType', () => {
    const result = isAllowedMimeType('video/mp4', ['image/*']);
    expect(result).toBe(false);
  });

  it('should return false for non-matching mimeType in a mixed allowedMimeTypes array', () => {
    const result = isAllowedMimeType('video/mp4', ['image/png', 'text/html', 'application/pdf']);
    expect(result).toBe(false);
  });
});

describe('FileFilter function', () => {
  it('should call the callback with an error if the file type is not allowed', () => {
    const options = { fileTypes: ['image/jpeg', 'image/png'] };
    const req = {} as ExpressRequest;
    const file = { mimetype: 'image/gif', size: 1024 } as Express.Multer.File;
    const callback = jest.fn();

    FileFilter(options)(req, file, callback);

    expect(callback).toHaveBeenCalledWith(new Error('INVALID_FILE_TYPE'), false);
  });

  it('should call the callback with an error if the file size exceeds the maximum allowed', () => {
    const options = { maxSize: 1024 };
    const req = {} as ExpressRequest;
    const file = { mimetype: 'image/jpeg', size: 2048 } as Express.Multer.File;
    const callback = jest.fn();

    FileFilter(options)(req, file, callback);

    expect(callback).toHaveBeenCalledWith(new Error('INVALID_FILE_SIZE'), false);
  });

  it('should call the callback with no error if the file type and size are allowed', () => {
    const options = { fileTypes: ['image/jpeg', 'image/png'], maxSize: 1024 };
    const req = {} as ExpressRequest;
    const file = { mimetype: 'image/jpeg', size: 512 } as Express.Multer.File;
    const callback = jest.fn();

    FileFilter(options)(req, file, callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });

  it('should call the callback with no error if options are not provided', () => {
    const req = {} as ExpressRequest;
    const file = { mimetype: 'image/jpeg', size: 1024 } as Express.Multer.File;
    const callback = jest.fn();

    FileFilter()(req, file, callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });
});
