import { FileValidator, HttpStatus, ParseFilePipe, ParseFilePipeBuilder } from '@nestjs/common';
import { ExceptionMessage, BadRequestException } from '../exceptions';
import { Express, Request } from 'express';

export const FilePipe = (options?: {
  fileType?: string;
  maxSize?: number;
  validators?: FileValidator[];
}): ParseFilePipe => {
  const pipe = new ParseFilePipeBuilder();
  if (options?.fileType) pipe.addFileTypeValidator({ fileType: options.fileType });
  if (options?.maxSize) pipe.addMaxSizeValidator({ maxSize: options.maxSize });
  if (options?.validators?.length) options?.validators.map(v => pipe.addValidator(v));
  return pipe.build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY });
};

export const isAllowedMimeType = (mimeType: string, allowedMimeTypes: string[] = []) => {
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
};

export const FileFilter = (options?: { fileTypes?: string[]; maxSize?: number }) => {
  return (req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    const { fileTypes, maxSize } = options || {};
    if (fileTypes && !isAllowedMimeType(file.mimetype, fileTypes)) {
      return callback(new BadRequestException(ExceptionMessage.INVALID_FILE_TYPE), false);
    }
    if (maxSize && file.size > maxSize) {
      return callback(new BadRequestException(ExceptionMessage.INVALID_FILE_SIZE), false);
    }
    callback(null, true);
  };
};
