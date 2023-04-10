import { BadRequestException, ExceptionMessage } from '../exceptions';

export interface IValidateError {
  [property: string]: string[];
}

export class ValidateException extends BadRequestException {
  constructor(data: IValidateError) {
    super(ExceptionMessage.INVALID_INPUT, data);
  }
}
