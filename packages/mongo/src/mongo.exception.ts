import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  InternalServerException,
  IValidateError,
  ValidateException,
} from '@joktec/core';
import { Error } from 'mongoose';
import { has, isEmpty, upperCase } from 'lodash';

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
    const formatError: IValidateError = {};

    function injectError(path: string, errMsgCode: string) {
      if (!formatError[path]) formatError[path] = [];
      formatError[path].push(errMsgCode);
    }

    if (err instanceof Error.ValidationError) {
      Object.values(err.errors).map(errItem => {
        const message: string =
          errItem instanceof Error.CastError ? `${errItem.path}_INVALID`.toUpperCase() : errItem.message;
        injectError(errItem.path, message);
      });
    }

    // Handle unique error
    if ((err?.code === 11000 || err?.code === 11001) && has(err, 'keyValue')) {
      Object.keys(err['keyValue']).map(path => {
        injectError(path, `${upperCase(path)}_DUPLICATED_VALUE`);
      });
    }

    if (!isEmpty(formatError)) {
      throw new ValidateException(formatError);
    }

    throw new MongoException(err.message, err);
  }
});
