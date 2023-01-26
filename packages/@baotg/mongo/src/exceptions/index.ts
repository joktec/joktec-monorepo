import { ExceptionStatus, RuntimeException } from '@baotg/core';

export class MongoConnectException extends RuntimeException {
  constructor(msg: string, error: any) {
    super(msg, ExceptionStatus.MONGO_CONNECTION_FAILED, error);
  }
}

export class MongoDisconnectedException extends RuntimeException {
  constructor(msg: string) {
    super(msg, ExceptionStatus.MONGO_DISCONNECTED, null);
  }
}
