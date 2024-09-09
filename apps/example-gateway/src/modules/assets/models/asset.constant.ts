import { FileFilter } from '@joktec/core';

export const DEFAULT_ORIGINAL_NAME = 'file';
export const DEFAULT_MIMETYPE = 'application/octet-stream';
export const DEFAULT_PREFIX = 'YYYY/MM/DD';
export const MAX_TOTAL_FILE = 10;
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const fileFilter = FileFilter({ fileTypes: '*', maxSize: MAX_FILE_SIZE });
