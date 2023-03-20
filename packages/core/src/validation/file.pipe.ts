import { FileValidator, HttpStatus, ParseFilePipe, ParseFilePipeBuilder } from '@nestjs/common';

export const FilePipe = (options?: {
  fileType?: string;
  maxSize?: number;
  customValidators?: FileValidator[];
}): ParseFilePipe => {
  const pipe = new ParseFilePipeBuilder();
  if (options?.fileType) pipe.addFileTypeValidator({ fileType: options.fileType });
  if (options?.maxSize) pipe.addMaxSizeValidator({ maxSize: options.maxSize });
  if (options?.customValidators?.length) options?.customValidators.map(v => pipe.addValidator(v));
  return pipe.build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY });
};
