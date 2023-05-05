import { ICondition, IPopulate, IPopulateOption } from '@joktec/core';
import { IMongoRequest, MongoSchema } from './models';
import { PopulateOptions, QueryOptions } from 'mongoose';
import { omit } from 'lodash';

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
  const { condition = {}, keyword } = query;
  const overrideCondition: ICondition<T> = preHandleCondition(condition);
  if (keyword) overrideCondition['$text'] = { $search: keyword };
  if (isSoftDelete) overrideCondition['deletedAt'] = { $eq: null };
  return overrideCondition;
};

export const preHandleBody = <T extends MongoSchema>(body: any): Partial<T> => {
  const processBody = omit(body, ['_id', 'createdAt', 'updatedAt', 'deletedAt', '__v', '__t', 'lat', 'lng']);
  if (body['lng'] && body['lat']) {
    processBody['location'] = {
      type: 'Point',
      coordinates: [parseFloat(body['lng'] ?? 0), parseFloat(body['lat'] ?? 0)],
    };
  }
  return processBody;
};

export const preHandleUpdateBody = <T extends MongoSchema>(body: any): Partial<T> => {
  const plain = preHandleBody(body);
  const outputObj = {};
  if (Object.keys(body).some(k => k.startsWith('$'))) {
    outputObj['$set'] = {};
  }

  for (const [key, value] of Object.entries(plain)) {
    if (key.startsWith('$')) {
      if (outputObj.hasOwnProperty(key)) {
        outputObj[key] = Object.assign({}, outputObj[key], value);
      } else {
        outputObj[key] = value;
      }
      continue;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const nestedObj = preHandleUpdateBody(value);
      for (const [nestedKey, nestedValue] of Object.entries(nestedObj)) {
        if (outputObj.hasOwnProperty('$set')) {
          outputObj['$set'][`${key}.${nestedKey}`] = nestedValue;
        } else {
          outputObj[`${key}.${nestedKey}`] = nestedValue;
        }
      }
      continue;
    }

    if (outputObj.hasOwnProperty('$set')) {
      outputObj['$set'][key] = value;
    } else {
      outputObj[key] = value;
    }
  }
  return outputObj;
};

export const projection = (select: string): string => select.split(',').join(' ');

/**
 * Convert populate object to mongoose populate options
 * @param populate
 * @param isSoftDelete
 */
export const convertPopulate = <T extends MongoSchema>(
  populate: IPopulate<T> = {},
  isSoftDelete: boolean = true,
): PopulateOptions[] => {
  return Object.keys(populate).map<PopulateOptions>(path => {
    const populateOptions: PopulateOptions = { path };
    const populateMatch = {};
    const options: '*' | IPopulateOption = populate[path];
    if (options !== '*') {
      if (options.select) populateOptions.select = projection(options.select);
      if (options.model) populateOptions.model = options.model;
      if (options.populate) populateOptions.populate = convertPopulate(options.populate);
      if (options.match) Object.assign(populateMatch, populateOptions.match);
    }
    populateOptions.match = preHandleQuery({ condition: populateMatch }, isSoftDelete);
    return populateOptions;
  });
};
