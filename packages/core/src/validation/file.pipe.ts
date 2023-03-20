import { FileValidator, HttpStatus, ParseFilePipe, ParseFilePipeBuilder } from '@nestjs/common';
import { ExceptionMessage, UnprocessableEntityException } from '../exceptions';

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

export const FileFilter = (options?: { fileTypes?: string[]; maxSize?: number }): Function => {
  return (req, file, callback) => {
    const { fileTypes, maxSize } = options || {};
    if (fileTypes && !isAllowedMimeType(file.mimetype, fileTypes)) {
      return callback(new UnprocessableEntityException(ExceptionMessage.INVALID_FILE_TYPE), false);
    }
    if (maxSize && file.size > maxSize) {
      return callback(new UnprocessableEntityException(ExceptionMessage.INVALID_FILE_SIZE), false);
    }
    callback(null, true);
  };
};
