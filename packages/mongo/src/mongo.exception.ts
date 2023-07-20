import {
  BaseMethodDecorator,
  CallbackDecoratorOptions,
  InternalServerException,
  IValidateError,
  ValidateException,
} from '@joktec/core';
import { Error } from 'mongoose';

export class MongoException extends InternalServerException {
  constructor(msg: string = 'MONGO_EXCEPTION', error: any) {
    super(msg, error);
  }
}

export const MongoCatch = BaseMethodDecorator(async (options: CallbackDecoratorOptions): Promise<any> => {
  const { method, args } = options;
  try {
    return await method(...args);
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const formatError: IValidateError = {};
      Object.values(err.errors).map(errItem => {
        if (!formatError.hasOwnProperty(errItem.path)) {
          formatError[errItem.path] = [];
        }
        const message: string =
          errItem instanceof Error.CastError ? `${errItem.path}_INVALID`.toUpperCase() : errItem.message;
        formatError[errItem.path].push(message);
      });
      throw new ValidateException(formatError);
    }

    if (err?.code === 11000 || err?.code === 11001) {
      // Skip
    }

    throw new MongoException(err.message, err);
  }
});
