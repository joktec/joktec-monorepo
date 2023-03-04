import { ICondition } from '@joktec/core';
import { IMongoRequest } from './models';

export const preHandleCondition = (condition: any): ICondition => {
  if (condition && typeof condition === 'object') {
    const keys = Object.keys(condition);
    for (const key of keys) {
      if (key === 'id') {
        condition['_id'] = condition['id'];
        delete condition['id'];
      } else if (typeof condition[key] === 'object') {
        condition[key] = preHandleCondition(condition[key]);
      }
    }
  }
  return condition;
};

export const preHandleQuery = (query: IMongoRequest): ICondition => {
  const { condition, keyword } = query;
  const overrideCondition: ICondition = preHandleCondition(condition);
  if (keyword) {
    Object.entries(keyword).map(([k, v]) => (overrideCondition[k] = { $regex: v, $options: 'i' }));
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
