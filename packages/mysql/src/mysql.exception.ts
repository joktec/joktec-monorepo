import { BaseMethodDecorator, CallbackMethodOptions, InternalServerException, ValidatorBuilder } from '@joktec/core';
import { snakeCase } from 'lodash';
import { ValidationErrorItem } from 'sequelize';

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
      const validationBuilder = ValidatorBuilder.init(MysqlException.name);
      err.errors.map((errItem: ValidationErrorItem) => {
        validationBuilder.add(errItem.path, errItem.message, errItem.value);
      });
      validationBuilder.throw();
    }

    if (err.parent || err.original) {
      const parent = err.parent || err.original;
      const msg = snakeCase(err.message).toUpperCase();
      throw new MysqlException(msg, parent);
    }

    throw new MysqlException(err.message, err);
  }
});
