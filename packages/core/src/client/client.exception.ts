import { ConfigException } from '../config';
import { ExceptionMessage } from '../exceptions';

export class InvalidClientConfigException extends ConfigException {
  constructor(msg: string = ExceptionMessage.INVALID_CLIENT_CONFIG, error: any) {
    super(msg, error);
  }
}

export class ClientConnectException extends ConfigException {
  constructor(msg: string = ExceptionMessage.CLIENT_CONNECTION_FAILED, error: any) {
    super(msg, error);
  }
}
