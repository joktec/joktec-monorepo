import {
  BadRequestException,
  BaseMethodDecorator,
  CallbackDecoratorOptions,
  InternalServerException,
} from '@joktec/core';
import { Error } from 'mongoose';
import { pick, snakeCase } from 'lodash';

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
      const errItems = Object.values(err.errors).map(errItem => {
        if (errItem instanceof Error.CastError) {
          return {
            message: snakeCase(`${errItem.path} must be ObjectID`).toUpperCase(),
            ...pick(errItem, ['path', 'value', 'kind', 'reason', 'stringValue']),
          };
        }
        return pick(errItem, ['path', 'message', 'value', 'kind', 'reason']);
      });
      throw new BadRequestException(errItems[0].message, errItems);
    }

    if (err?.code === 11000 || err?.code === 11001) {
    }

    throw new MongoException(err.message, err);
  }
});
