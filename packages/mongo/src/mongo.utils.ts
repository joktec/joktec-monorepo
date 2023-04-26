import { ICondition, IPopulate, IPopulateOption } from '@joktec/core';
import { IMongoRequest, MongoSchema } from './models';
import { PopulateOptions, QueryOptions } from 'mongoose';

export const UPDATE_OPTIONS: QueryOptions = {
  runValidators: true,
  new: true,
};

export const DELETE_OPTIONS: QueryOptions = {
  rawResult: false,
};

export const UPSERT_OPTIONS: QueryOptions = {
  upsert: true,
  new: true,
  runValidators: true,
};

export const preHandleCondition = <T extends MongoSchema>(condition: any): ICondition<T> => {
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

export const preHandleQuery = <T extends MongoSchema>(
  query: IMongoRequest<T>,
  isSoftDelete: boolean = true,
): ICondition<T> => {
  const { condition, keyword } = query;
  const overrideCondition: ICondition<T> = preHandleCondition(condition);
  if (keyword) overrideCondition['$text'] = { $search: keyword };
  if (isSoftDelete) overrideCondition['deletedAt'] = { $eq: null };
  return overrideCondition;
};

export const preHandleBody = <T extends MongoSchema>(body: Partial<T>): Partial<T> => {
  const processBody = { ...body };
  delete processBody._id;
  delete processBody.createdAt;
  delete processBody.updatedAt;
  delete processBody.deletedAt;

  if (processBody['lng'] && processBody['lat']) {
    processBody['location'] = {
      type: 'Point',
      coordinates: [parseFloat(processBody['lng'] ?? 0), parseFloat(processBody['lat'] ?? 0)],
    };
    delete processBody['lng'];
    delete processBody['lat'];
  }

  return processBody;
};

export const preHandleUpdateBody = <T extends MongoSchema>(body: Partial<T>): Partial<T> => {
  const plain = preHandleBody(body);
  const outputObj = {};
  for (const [key, value] of Object.entries(plain)) {
    if (key.includes('$')) {
      outputObj[key] = value;
      continue;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const nestedObj = preHandleUpdateBody(value);
      for (const [nestedKey, nestedValue] of Object.entries(nestedObj)) {
        outputObj[`${key}.${nestedKey}`] = nestedValue;
      }
      continue;
    }

    outputObj[key] = value;
  }
  return outputObj;
};

export const projection = (select: string): string => select.split(',').join(' ');

/**
 * Convert populate object to mongoose populate options
 * @param populate
 */
export const convertPopulate = <T extends MongoSchema>(populate: IPopulate<T> = {}): PopulateOptions[] => {
  return Object.keys(populate).map<PopulateOptions>(path => {
    const populateOptions: PopulateOptions = { path };
    const options: '*' | IPopulateOption = populate[path];
    if (options !== '*') {
      if (options.select) populateOptions.select = projection(options.select);
      if (options.model) populateOptions.model = options.model;
      if (options.populate) populateOptions.populate = convertPopulate(options.populate);
    }
    return populateOptions;
  });
};
