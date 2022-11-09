import { RuntimeException } from '../../../errors';

export class MicroServiceNotFoundException extends RuntimeException {
  constructor(msg = 'Server Error') {
    super(msg, 'MICRO_SERVICE_NOT_FOUND', null);
  }
}
