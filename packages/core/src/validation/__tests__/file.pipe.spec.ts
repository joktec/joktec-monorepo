import { describe, expect, it } from '@jest/globals';
import { isAllowedMimeType, FileFilter } from '../file.pipe';

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
