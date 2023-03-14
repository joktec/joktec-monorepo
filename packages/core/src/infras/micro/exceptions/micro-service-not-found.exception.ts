import { ExceptionMessage, InternalServerException } from '../../../exceptions';

export class MicroServiceNotFoundException extends InternalServerException {
  constructor(msg: string = ExceptionMessage.MICRO_SERVICE_NOT_FOUND) {
    super(msg, null);
  }
}
