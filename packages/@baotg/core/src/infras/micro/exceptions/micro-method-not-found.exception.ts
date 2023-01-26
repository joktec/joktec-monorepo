import { ExceptionStatus, RuntimeException } from '../../../exceptions';

export class MicroMethodNotFoundException extends RuntimeException {
  constructor(msg = 'Server Error') {
    super(msg, ExceptionStatus.MICRO_METHOD_NOT_FOUND, null);
  }
}
