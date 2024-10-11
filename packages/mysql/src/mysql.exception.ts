import { BaseMethodDecorator, CallbackMethodOptions, InternalServerException } from '@joktec/core';
import { snakeCase } from 'lodash';
import { QueryFailedError } from 'typeorm';

export class MysqlException extends InternalServerException {
  constructor(msg: string = 'MYSQL_EXCEPTION', error?: any) {
    super(msg, error);
  }
}

export const MysqlCatch = BaseMethodDecorator(async (options: CallbackMethodOptions): Promise<any> => {
  const { method, args } = options;
  try {
    return await method(...args);
  } catch (err) {
    if (err instanceof QueryFailedError) {
      const msg = snakeCase(err.message).toUpperCase();
      throw new MysqlException(msg, err);
    }
    throw new MysqlException(err, err.message);
  }
});
