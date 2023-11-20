import { describe, expect, it, jest } from '@jest/globals';
import { FileFilter, isAllowedMimeType } from '../file.pipe';
import { ExpressRequest } from '../../base';
import { HttpType } from '../../constants';

describe('isAllowedMimeType function', () => {
  it('should return true for empty allowedMimeTypes array', () => {
    const result = isAllowedMimeType(HttpType.PNG, []);
    expect(result).toBe(true);
  });

  it('should return true for exact match in allowedMimeTypes array', () => {
    const result = isAllowedMimeType(HttpType.PNG, [HttpType.PNG]);
    expect(result).toBe(true);
  });

  it('should return true for wildcard match in allowedMimeTypes array', () => {
    const result = isAllowedMimeType(HttpType.PNG, [HttpType.IMAGE]);
    expect(result).toBe(true);
  });

  it('should return false for non-matching mimeType', () => {
    const result = isAllowedMimeType(HttpType.MP4, [HttpType.IMAGE]);
    expect(result).toBe(false);
  });

  it('should return false for non-matching mimeType in a mixed allowedMimeTypes array', () => {
    const result = isAllowedMimeType(HttpType.MP4, [HttpType.PNG, HttpType.HTML, HttpType.PDF]);
    expect(result).toBe(false);
  });
});

describe('FileFilter function', () => {
  it('should call the callback with an error if the file type is not allowed', () => {
    const options = { fileTypes: [HttpType.JPEG, HttpType.PNG] };
    const req = {} as ExpressRequest;
    const file = { mimetype: HttpType.GIF, size: 1024 } as Express.Multer.File;
    const callback = jest.fn();

    FileFilter(options)(req, file, callback);

    expect(callback).toHaveBeenCalledWith(new Error('INVALID_FILE_TYPE'), false);
  });

  it('should call the callback with an error if the file size exceeds the maximum allowed', () => {
    const options = { maxSize: 1024 };
    const req = {} as ExpressRequest;
    const file = { mimetype: HttpType.JPEG, size: 2048 } as Express.Multer.File;
    const callback = jest.fn();

    FileFilter(options)(req, file, callback);

    expect(callback).toHaveBeenCalledWith(new Error('INVALID_FILE_SIZE'), false);
  });

  it('should call the callback with no error if the file type and size are allowed', () => {
    const options = { fileTypes: [HttpType.JPEG, HttpType.PNG], maxSize: 1024 };
    const req = {} as ExpressRequest;
    const file = { mimetype: HttpType.JPEG, size: 512 } as Express.Multer.File;
    const callback = jest.fn();

    FileFilter(options)(req, file, callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });

  it('should call the callback with no error if options are not provided', () => {
    const req = {} as ExpressRequest;
    const file = { mimetype: HttpType.JPEG, size: 1024 } as Express.Multer.File;
    const callback = jest.fn();

    FileFilter()(req, file, callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });
});
