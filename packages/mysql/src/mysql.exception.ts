import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  InternalServerException,
  IValidateError,
  ValidateException,
} from '@joktec/core';
import { snakeCase } from 'lodash';

export class MysqlException extends InternalServerException {
  constructor(msg: string = 'MYSQL_EXCEPTION', error: any) {
    super(msg, error);
  }
}

export const MysqlCatch = BaseMethodDecorator(async (options: CallbackMethodOptions): Promise<any> => {
  const { method, args } = options;
  try {
    return await method(...args);
  } catch (err) {
    if (err.errors && Array.isArray(err.errors)) {
      const formatError: IValidateError = {};
      err.errors.map(errItem => {
        if (!formatError.hasOwnProperty(errItem.path)) {
          formatError[errItem.path] = [];
        }
        formatError[errItem.path].push(errItem.message);
      });
      throw new ValidateException(formatError);
    }

    if (err.parent || err.original) {
      const parent = err.parent || err.original;
      const msg = snakeCase(err.message).toUpperCase();
      throw new MysqlException(msg, parent);
    }

    throw new MysqlException(err.message, err);
  }
});
