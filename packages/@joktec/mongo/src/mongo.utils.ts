import { ExceptionStatus, ICondition, RuntimeException } from '@joktec/core';
import { mongoose } from '@typegoose/typegoose';
import { IMongoRequest, ObjectId } from './models';
import { Buffer } from 'buffer';
import { ObjectIdLike } from 'bson';
import _ from 'lodash';
import moment from 'moment';

export const preHandleQuery = (query: IMongoRequest, softDelete: boolean = false): ICondition => {
  const { condition, keyword } = query;
  const overrideCondition: ICondition = { ...condition };
  if (keyword) {
    Object.entries(keyword).map(([k, v]) => (overrideCondition[k] = { $regex: v, $options: 'i' }));
  }
  if (softDelete) {
    if (!overrideCondition.$or) overrideCondition.$or = [];
    overrideCondition.$or.push({ deletedAt: { $eq: null } });
    overrideCondition.$or.push({ deletedAt: { $exists: false } });
  }
  return overrideCondition;
};

export const preHandleBody = <T extends {} = any>(body: T): T => {
  const processBody: any = { ...body };
  delete processBody._id;
  delete processBody.createdAt;
  delete processBody.updatedAt;
  delete processBody.deletedAt;

  if (processBody.lng && processBody.lat) {
    processBody.location = {
      type: 'Point',
      coordinates: [parseFloat(processBody.lng ?? 0), parseFloat(processBody.lat ?? 0)],
    };
    delete processBody.lng;
    delete processBody.lat;
  }

  return processBody;
};

export const isObjectId = (_id: string | number | ObjectId | ObjectIdLike | Buffer | Uint8Array): boolean => {
  return mongoose.Types.ObjectId.isValid(_id);
};

export const createObjectId = (value: string | Date): ObjectId => {
  if (_.isString(value)) {
    if (isObjectId(value)) {
      throw new RuntimeException('OBJECT_ID_INVALID', ExceptionStatus.OBJECT_ID_INVALID, value);
    }
    return new mongoose.Types.ObjectId(value);
  }
  const unixTimestamp: number = moment(value).unix();
  const buffer: Buffer = mongoose.Types.ObjectId.generate(unixTimestamp);
  return new mongoose.Types.ObjectId(buffer);
};
