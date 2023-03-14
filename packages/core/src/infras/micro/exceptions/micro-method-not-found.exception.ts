import { ExceptionMessage, InternalServerException } from '../../../exceptions';

export class MicroMethodNotFoundException extends InternalServerException {
  constructor(msg: string = ExceptionMessage.MICRO_METHOD_NOT_FOUND) {
    super(msg, null);
  }
}
