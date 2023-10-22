import { ExceptionMessage, InternalServerException } from '../exceptions';

export class ConfigException extends InternalServerException {
  constructor(msg: string = ExceptionMessage.INVALID_CONFIG, error: any) {
    super(msg, error);
  }
}
