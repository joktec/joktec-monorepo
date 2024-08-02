import { RpcException } from '@nestjs/microservices';
import { Exception } from './exception';

export class MicroRpcException extends RpcException {
  constructor(error: Exception) {
    super({ ...error, status: error.status, message: error.message });
    if (error.stack) this.stack = error.stack;
  }
}
