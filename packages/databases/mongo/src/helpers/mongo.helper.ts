import { Dictionary, ICondition, IPopulate, IPopulateOption, ISort } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { Ref } from '@typegoose/typegoose';
import { isArray, isBuffer, isDate, isEmpty, isNil, isNumber, isObject, isRegExp, isString, omit, pick } from 'lodash';
import { PopulateOptions, RefType } from 'mongoose';
import { MongoSchema, ObjectId } from '../models';

export class MongoHelper {
  static flatten(obj: Dictionary, omitKeys?: string[]): Dictionary {
    const result: Dictionary = {};

    function convert(obj: object) {
      const firstOperator = Object.keys(obj).find(key => String(key).startsWith('$'));
      if (!firstOperator) return obj;
      // if (firstOperator.startsWith('$$')) {
      //   const newKey = firstOperator.slice(0, 1);
      //   obj[newKey] = obj[firstOperator];
      //   delete obj[firstOperator];
      // }
      return obj;
    }

    function recurse(value: any, prefix = '') {
      if (value instanceof ObjectId) {
        result[prefix] = value;
        return;
      }

      if (isString(value) && ObjectId.isValid(value)) {
        result[prefix] = ObjectId.create(value);
        return;
      }

      if (isArray(value)) {
        result[prefix] = value.map(v => {
          if (v instanceof ObjectId) return v;
          if (isString(v) && ObjectId.isValid(v)) return ObjectId.create(v);
          return v;
        });
        return;
      }

      if (!value || isDate(value) || isRegExp(value) || !isObject(value)) {
        result[prefix] = value;
        return;
      }

      if (isObject(value) && omitKeys?.length) {
        value = omit(value, omitKeys);
      }

      if (Object.keys(value).some(key => String(key).startsWith('$'))) {
        result[prefix] = convert(value);
        return;
      }

      Object.keys(value).forEach(key => {
        if (key === 'id') {
          value['_id'] = value['id'];
          delete value['id'];
          key = '_id';
        }
        const newKey = prefix ? `${prefix}.${key}` : key;
        recurse(value[key], newKey);
      });
    }

    const rootQuery = Object.keys(obj).filter(key => String(key).startsWith('$'));
    Object.assign(result, pick(obj, rootQuery));
    recurse(omit(obj, rootQuery));
    return result;
  }

  static parseProjection(select: string | string[] | Record<string, number | boolean | object>): Record<string, 1 | 0> {
    if (isObject(select)) return this.flatten(select);
    return toArray(select, { split: ',' }).reduce((acc: Record<string, 1 | 0>, field) => {
      const trimField = field.trim();
      if (!trimField) return acc;
      if (trimField.startsWith('-')) acc[trimField.slice(1)] = 0;
      else acc[trimField] = 1;
      return acc;
    }, {});
  }

  static parseSort(sort: ISort<any>): Record<string, 1 | -1> {
    const flattenSort = MongoHelper.flatten(sort);
    return Object.entries(flattenSort).reduce((acc: Record<string, 1 | -1>, [field, order]) => {
      acc[field] = order === 'asc' || order === 1 || order === '1' ? 1 : -1;
      return acc;
    }, {});
  }

  static parseFilter(condition: ICondition<any>, flat: boolean = true): ICondition<any> {
    const flatObj = flat ? this.flatten(condition) : condition;
    const keys = Object.keys(flatObj);
    for (const key of keys) {
      if (isNil(flatObj[key])) {
        flatObj[key] = null;
        continue;
      }

      if (flatObj[key] instanceof ObjectId) {
        continue;
      }

      if (isString(flatObj[key]) && ObjectId.isValid(flatObj[key])) {
        flatObj[key] = ObjectId.create(flatObj[key]);
        continue;
      }

      if (isDate(flatObj[key]) || isRegExp(flatObj[key]) || !isObject(flatObj[key])) {
        continue;
      }

      if (flatObj[key].hasOwnProperty('$like')) {
        flatObj[key]['$regex'] = new RegExp(flatObj[key]['$like'], 'i');
        delete flatObj[key]['$like'];
        continue;
      } else if (flatObj[key].hasOwnProperty('$begin')) {
        flatObj[key]['$regex'] = new RegExp(`^${flatObj[key]['$begin']}`, 'i');
        delete flatObj[key]['$begin'];
        continue;
      } else if (flatObj[key].hasOwnProperty('$end')) {
        flatObj[key]['$regex'] = new RegExp(`${flatObj[key]['$end']}$`, 'i');
        delete flatObj[key]['$end'];
        continue;
      } else if (flatObj[key].hasOwnProperty('$nil')) {
        flatObj[key] = null;
        continue;
      } else if (flatObj[key].hasOwnProperty('$empty')) {
        flatObj[key] = '';
        continue;
      }

      flatObj[key] = this.parseFilter(flatObj[key], false);
    }

    return flatObj;
  }

  static parsePopulate<T extends MongoSchema>(populate: IPopulate<T> = {}): PopulateOptions[] {
    if (isNil(populate) || isEmpty(populate)) return [];
    return Object.entries(populate).map(([path, populate]) => {
      const populateOptions: PopulateOptions = { path };
      const options: IPopulateOption = populate === '*' ? {} : populate;

      if (options.select) populateOptions.select = options.select;
      if (options.model) populateOptions.model = options.model as any;
      if (options.populate) populateOptions.populate = this.parsePopulate(options.populate);
      if (options.match) populateOptions.match = options.match;

      return populateOptions;
    });
  }

  static parseSimpleCondition<T extends MongoSchema, ID extends RefType = string>(
    cond: ID | ObjectId | Ref<T, ID> | ICondition<T>,
  ): ICondition<T> {
    const condition: ICondition<T> = {};
    switch (true) {
      case ObjectId.isValid(String(cond)):
      case isString(cond):
      case isNumber(cond):
      case isBuffer(cond):
        Object.assign(condition, { _id: ObjectId.create(String(cond)) });
        break;

      case isObject(cond):
      case isArray(cond):
        Object.assign(condition, cond);
        break;

      default:
        Object.assign(condition, { _id: ObjectId.create(String(cond)) });
    }
    return condition;
  }
}
