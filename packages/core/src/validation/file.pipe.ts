import path from 'path';
import { FileValidator, ParseFilePipe, ParseFilePipeBuilder } from '@nestjs/common';
import { Express } from 'express';
import { BadRequestException, ExceptionMessage } from '../exceptions';
import { ExpressRequest, HttpStatus } from '../models';

export const FilePipe = (options?: {
  fileType?: string;
  maxSize?: number;
  validators?: FileValidator[];
}): ParseFilePipe => {
  const pipe = new ParseFilePipeBuilder();
  if (options?.fileType) pipe.addFileTypeValidator({ fileType: options.fileType });
  if (options?.maxSize) pipe.addMaxSizeValidator({ maxSize: options.maxSize });
  if (options?.validators?.length) options?.validators.map(v => pipe.addValidator(v));
  return pipe.build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY as number });
};

export function isAllowedMimeType(mimeType: string, allowedMimeTypes: string[] = []) {
  if (!allowedMimeTypes.length) return true;
  for (let i = 0; i < allowedMimeTypes.length; i++) {
    const allowedType = allowedMimeTypes[i];
    if (allowedType.endsWith('*')) {
      const allowedPrefix = allowedType.slice(0, -1);
      if (mimeType.startsWith(allowedPrefix)) return true;
    }
    if (mimeType === allowedType) return true;
  }
  return false;
}

export const FileFilter = (options?: { fileTypes?: '*' | string[]; maxSize?: number }) => {
  return (
    req: ExpressRequest,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!file.mimetype && !path.parse(file.originalname).ext) {
      return callback(new BadRequestException(ExceptionMessage.INVALID_FILE_TYPE), false);
    }

    const { fileTypes = '*', maxSize = 0 } = options || {};
    if (fileTypes === '*') return callback(null, true);
    if (fileTypes && !isAllowedMimeType(file.mimetype, fileTypes)) {
      return callback(new BadRequestException(ExceptionMessage.INVALID_FILE_TYPE), false);
    }

    if (maxSize && file.size > maxSize) {
      return callback(new BadRequestException(ExceptionMessage.INVALID_FILE_SIZE), false);
    }

    callback(null, true);
  };
};
