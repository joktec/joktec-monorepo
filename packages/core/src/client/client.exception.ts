import { ExceptionMessage, InternalServerException } from '../exceptions';

export class InvalidClientConfigException extends InternalServerException {
  constructor(msg: string = ExceptionMessage.INVALID_CLIENT_CONFIG, error: any) {
    super(msg, error);
  }
}

export class ClientConnectException extends InternalServerException {
  constructor(msg: string = ExceptionMessage.CLIENT_CONNECTION_FAILED, error: any) {
    super(msg, error);
  }
}
