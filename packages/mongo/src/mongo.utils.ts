import { cloneInstance, ICondition, IPopulate, IPopulateOption } from '@joktec/core';
import { IMongoRequest } from './models';
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

export const preHandleQuery = (query: IMongoRequest, isSoftDelete: boolean = true): ICondition => {
  const { condition, keyword } = query;
  const overrideCondition: ICondition = preHandleCondition(condition);
  if (keyword) {
    Object.entries(keyword).map(([k, v]) => (overrideCondition[k] = { $regex: v, $options: 'i' }));
  }
  if (isSoftDelete) {
    Object.assign<ICondition, ICondition>(overrideCondition, { deletedAt: { $eq: null } });
  }
  return overrideCondition;
};

export const preHandleBody = <T extends {} = any>(body: Partial<T>): Partial<T> => {
  const processBody: any = cloneInstance(body);
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

export const preHandleUpdateBody = <T extends {} = any>(body: Partial<T>): Partial<T> => {
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

export const projection = (select?: string): { [key: string]: number } => {
  if (!select) return null;
  return select.split(',').reduce((projection, field) => {
    projection[field.trim()] = 1;
    return projection;
  }, {});
};

export const convertPopulate = (populate: IPopulate = {}): PopulateOptions[] => {
  return Object.keys(populate).map<PopulateOptions>(path => {
    const populateOptions: PopulateOptions = { path };
    const options: '*' | IPopulateOption = populate[path];
    if (options !== '*') {
      if (options.select) populateOptions.select = options.select;
      if (options.model) populateOptions.model = options.model;
      if (options.populate) populateOptions.populate = convertPopulate(options.populate);
    }
    return populateOptions;
  });
};
