import { RuntimeException } from '../../errors';

export class InvalidClientConfigException extends RuntimeException {
  constructor(msg: string, error: any) {
    super(msg, 'INVALID_CLIENT_CONFIG', error);
  }
}
