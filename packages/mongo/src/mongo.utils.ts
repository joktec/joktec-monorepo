import { ICondition, IPopulate, IPopulateOption, toInt } from '@joktec/core';
import { IMongoRequest, MongoSchema } from './models';
import { PopulateOptions, QueryOptions } from 'mongoose';
import { omit, isNil, pick, isDate } from 'lodash';
import dot from 'dot-object';
import { isMoment } from 'moment';

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
  const { condition = {}, keyword, near } = query;
  const overrideCondition: ICondition<T> = preHandleCondition(condition);
  if (keyword) overrideCondition['$text'] = { $search: keyword };
  if (isSoftDelete) overrideCondition['deletedAt'] = { $eq: null };
  if (near) {
    const { lat, lng, distance, field = 'location' } = near;
    overrideCondition[field] = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        $maxDistance: toInt(distance, 1000),
      },
    };
  }
  return overrideCondition;
};

export const preHandleBody = <T extends object>(body: object): Partial<T> => {
  const processBody = omit(body, ['_id', 'createdAt', 'updatedAt', 'deletedAt', '__v', '__t']);
  const result: Partial<T> = {};

  for (const key in processBody) {
    if (Object.prototype.hasOwnProperty.call(processBody, key)) {
      const value = processBody[key];
      if (Array.isArray(value)) {
        result[key] = value.map(item => (typeof item === 'object' && !isNil(item) ? preHandleBody(item) : item));
      } else if (isDate(value)) {
        result[key] = value;
      } else if (isMoment(value)) {
        result[key] = value.toDate();
      } else if (typeof value === 'object' && !isNil(value)) {
        result[key] = preHandleBody(value);
      } else {
        result[key] = value;
      }
    }
  }

  return result;
};

export const preHandleUpdateBody = <T extends object>(body: object): Partial<T> => {
  const fields = Object.keys(body).filter(key => !key.startsWith('$'));
  const operatorFields = Object.keys(body).filter(key => key.startsWith('$'));

  const processBody: any = pick(body, operatorFields);
  if (!processBody.hasOwnProperty('$set')) processBody['$set'] = {};

  dot.keepArray = true;
  processBody['$set'] = {
    ...dot.dot(preHandleBody(pick(body, fields))),
    ...dot.dot(preHandleBody(processBody['$set'])),
  };

  return processBody;
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
