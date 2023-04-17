import { cloneInstance, ICondition, IPopulate, Transform } from '@joktec/core';
import { IMongoRequest } from './models';
import { PopulateOptions, QueryOptions } from 'mongoose';
import { TransformFnParams, TransformOptions } from 'class-transformer/types/interfaces';
import { mongoose } from '@typegoose/typegoose';

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

export const projection = (select?: string): { [key: string]: number } => {
  if (!select) return null;
  return select.split(',').reduce((projection, field) => {
    projection[field.trim()] = 1;
    return projection;
  }, {});
};

export const convertPopulate = (populate: IPopulate[] = []): PopulateOptions[] => {
  return populate.map<PopulateOptions>(p => {
    const options: PopulateOptions = { path: p.path };
    if (p.select) options.select = p.select;
    if (p.model) options.model = p.model;
    if (p.populate) options.populate = convertPopulate(p.populate);
    return options;
  });
};

export const TransformObjectId = (options?: TransformOptions): PropertyDecorator => {
  return Transform(
    (params: TransformFnParams): string => {
      const { value } = params;
      if (!value) return null;
      if (value instanceof mongoose.Types.ObjectId || typeof value === 'object') {
        return value.toString();
      }
      return value;
    },
    { ...options },
  );
};
