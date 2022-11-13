import { RuntimeException } from '../../../errors';

export class MicroMethodNotFoundException extends RuntimeException {
  constructor(msg = 'Server Error') {
    super(msg, 'GRPC_METHOD_NOT_FOUND', null);
  }
}
