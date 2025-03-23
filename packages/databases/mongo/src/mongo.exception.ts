import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Exception,
  InternalServerException,
  ValidatorBuilder,
} from '@joktec/core';
import { has, upperCase } from 'lodash';
import { Error } from 'mongoose';

export class MongoException extends InternalServerException {
  constructor(msg: string = 'MONGO_EXCEPTION', error: any) {
    super(msg, error);
  }
}

export const MongoCatch = BaseMethodDecorator(async (options: CallbackMethodOptions): Promise<any> => {
  const { method, args } = options;
  try {
    return await method(...args);
  } catch (err) {
    if (err instanceof Exception) {
      throw err;
    }

    // Handle basic mongo exception
    if (err instanceof Error.ValidationError) {
      const validationBuilder = ValidatorBuilder.init(MongoException.name);
      Object.values(err.errors).map(errItem => {
        const msg = errItem instanceof Error.CastError ? `${errItem.path}_INVALID`.toUpperCase() : errItem.message;
        validationBuilder.add(errItem.path, msg, errItem.value);
      });
      validationBuilder.throw();
    }

    // Handle unique error
    if ((err?.code === 11000 || err?.code === 11001) && has(err, 'keyValue')) {
      const validationBuilder = ValidatorBuilder.init(MongoException.name);
      Object.entries(err['keyValue']).map(([path, value]) => {
        const msg = `${upperCase(path)}_DUPLICATED_VALUE`;
        validationBuilder.add(path, msg, value);
      });
      validationBuilder.throw();
    }

    throw new MongoException(err.message, err);
  }
});
