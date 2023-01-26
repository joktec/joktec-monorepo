import { ExceptionStatus, RuntimeException } from '@baotg/core';
import { mongoose } from '@typegoose/typegoose';
import { ObjectId } from './models';
import { Buffer } from 'buffer';
import { ObjectIdLike } from 'bson';
import _ from 'lodash';
import moment from 'moment';

export const preHandleBody = <T extends {} = any>(body: T): T => {
  const processBody: any = { ...body };
  delete processBody._id;
  delete processBody.createdAt;
  delete processBody.updatedAt;

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
