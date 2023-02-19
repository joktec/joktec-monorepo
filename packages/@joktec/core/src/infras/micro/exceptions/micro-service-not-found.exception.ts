import { ExceptionStatus, RuntimeException } from '../../../exceptions';

export class MicroServiceNotFoundException extends RuntimeException {
  constructor(msg = 'Server Error') {
    super(msg, ExceptionStatus.MICRO_SERVICE_NOT_FOUND, null);
  }
}
