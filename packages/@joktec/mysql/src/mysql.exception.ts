import {
  BadRequestException,
  BaseMethodDecorator,
  CallbackDecoratorOptions,
  InternalServerException,
} from '@joktec/core';
import { pick, snakeCase } from 'lodash';

export class MysqlException extends InternalServerException {
  constructor(msg: string = 'MYSQL_EXCEPTION', error: any) {
    super(msg, error);
  }
}

export const MysqlCatch = BaseMethodDecorator(async (options: CallbackDecoratorOptions): Promise<any> => {
  const { method, args } = options;
  try {
    return await method(...args);
  } catch (err) {
    if (err.errors && Array.isArray(err.errors)) {
      const items = err.errors.map(errItem => pick(errItem, ['message', 'path', 'value', 'validatorArgs']));
      throw new BadRequestException(items[0].message, items);
    }

    if (err.parent || err.original) {
      const parent = err.parent || err.original;
      const msg = snakeCase(err.message).toUpperCase();
      throw new BadRequestException(msg, parent);
    }

    throw new MysqlException(err.message, err);
  }
});
