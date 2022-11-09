import { HydratedDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IBaseService } from '../interfaces/base.service.interface';
import { CustomMongooseDocument } from '../utils/mongoose';

import { ListQuery, Query, DEFAULT_QUERY, DEFAULT_LIST_QUERY } from '../utils/express';
import { BaseConditionInput, BasePaginationInput } from '../inputs';
import { omit } from 'lodash';

export interface ICustomConditionQuery {
  // tslint:disable-next-line:prefer-array-literal
  readonly [key: string]: string | Array<string> | any;
}
export class BaseService<
  T extends CustomMongooseDocument,
  CONDITION extends BaseConditionInput = BaseConditionInput,
  PAGINATION extends BasePaginationInput = BasePaginationInput,
> implements IBaseService<T>
{
  constructor(@InjectModel('') private model: Model<T>) {}

  transform(document: any): T {
    return document && document.toJSON();
  }

  async findAll(listQuery: ListQuery = DEFAULT_LIST_QUERY): Promise<readonly T[]> {
    const { query, populate, sort, skip, limit, select } = listQuery;

    const documents = await this.model
      .find(query as any)
      .populate(populate)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    return documents.map(this.transform);
  }

  async count(listQuery: ListQuery = DEFAULT_LIST_QUERY): Promise<number> {
    const { query } = listQuery;

    return await this.model.countDocuments(query as any).exec();
  }

  async findById(id: string, query: Query = DEFAULT_QUERY): Promise<T> {
    const { populate, select } = query;

    const document = await this.model.findById(id).populate(populate).select(select).exec();

    return this.transform(document);
  }

  private getQueryCondition(
    condition: CONDITION = {} as any,
    customCondition: ICustomConditionQuery = {} as ICustomConditionQuery,
  ): any {
    const { keyword } = condition;
    const findQuery = {} as any;
    if (keyword) {
      findQuery.name = { $regex: keyword, $options: 'i' };
    }

    const overrideCondition: ICustomConditionQuery = omit(condition, ['keyword', 'includeTotalItems']);

    return {
      ...findQuery,
      ...overrideCondition,
      ...customCondition,
    };
  }

  private getSortCondition(sortBy: string, orderBy: string) {
    const sortCondition = {} as any;
    if (sortBy) {
      sortCondition[sortBy] = orderBy;
      return sortCondition;
    }
    return sortBy;
  }

  async batchGetIds(ids: readonly string[]): Promise<T[]> {
    const documents = await this.model
      .find({
        _id: ids,
      })
      .exec();

    return documents;
  }

  async query(
    condition: CONDITION,
    pagination: PAGINATION,
    customCondition: ICustomConditionQuery = {} as ICustomConditionQuery,
  ): Promise<any> {
    // tslint:disable-next-line:no-let
    let defaultPagination = {
      page: 1,
      pageSize: 20,
      sortBy: '_id',
      orderBy: 'asc',
    } as any;

    if (pagination) {
      defaultPagination = {
        ...defaultPagination,
        ...pagination,
      };
    }

    // tslint:disable-next-line:no-let
    let defaultCondition = {
      includeTotalItems: true,
    } as any;

    if (condition) {
      defaultCondition = {
        ...defaultCondition,
        ...condition,
      };
    }

    const { includeTotalItems } = defaultCondition;
    const { page, pageSize, sortBy, orderBy } = defaultPagination;

    const skip = (page - 1) * pageSize;

    // tslint:disable-next-line:no-let
    let totalItems = 0;

    if (includeTotalItems) {
      totalItems = await this.queryCount(defaultCondition, customCondition);
    }

    const documents = await this.model
      .find(this.getQueryCondition(defaultCondition, customCondition))
      // .populate(populate)
      // .select(select)
      .collation({ locale: 'en' })
      .sort(this.getSortCondition(sortBy, orderBy))
      .skip(skip)
      .limit(pageSize)
      .exec();

    const response = {
      items: documents.map(this.transform),
      condition: defaultCondition,
      pagination: defaultPagination,
    };

    return {
      ...response,
      totalItems,
    };
  }

  async queryCount(
    condition: CONDITION,
    customCondition: ICustomConditionQuery = {} as ICustomConditionQuery,
  ): Promise<number> {
    return this.model.countDocuments(this.getQueryCondition(condition, customCondition)).exec();
  }

  async findOne(condition: any = {}, query: Query = DEFAULT_QUERY): Promise<T> {
    const { populate, select } = query;

    const document = await this.model.findOne(condition).populate(populate).select(select).exec();

    return this.transform(document);
  }

  async create(payload: any) {
    const document = new this.model(payload);
    await document.$create();
    return this.transform(document);
  }

  async update(id: string, payload: any): Promise<T> {
    const document = await this.model.findById(id).exec();
    await (document as T).$update(payload);

    return this.transform(document);
  }

  async remove(id: string): Promise<T> {
    const document = await this.model.findById(id).exec();
    await (document as T).$delete();

    return this.transform(document);
  }

  // custom using method of orginal model
  async findAllCustom(condition?: any, query?: Query): Promise<T[]> {
    const { populate = [], select } = query || {};
    const documents = await this.model.find(condition).populate(populate).select(select).exec();

    return documents;
  }

  async findOneCustom(condition?: any, query?: Query): Promise<any> {
    const { populate = [], select } = query || {};
    const document = await this.model.findOne(condition).populate(populate).select(select).exec();
    return document;
  }

  async countCustom(query: any): Promise<number> {
    return await this.model.count(query).exec();
  }
}
