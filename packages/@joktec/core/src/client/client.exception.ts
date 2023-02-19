import { ExceptionStatus, RuntimeException } from '../exceptions';

export class InvalidClientConfigException extends RuntimeException {
  constructor(msg: string, error: any) {
    super(msg, ExceptionStatus.INVALID_CLIENT_CONFIG, error);
  }
}

export class ClientConnectException extends RuntimeException {
  constructor(msg: string, error: any) {
    super(msg, ExceptionStatus.CLIENT_CONNECTION_FAILED, error);
  }
}
