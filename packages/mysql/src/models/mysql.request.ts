import { IBaseRequest, IDataType } from '@joktec/core';
import { Model } from 'sequelize-typescript';

export type MysqlId = string | number | bigint;
export type ArrayBinding = Array<IDataType>;
export type DictBinding = { [key: string]: IDataType };
export type RawBinding = ArrayBinding | DictBinding;

export interface IMysqlRequest<T extends Model<T>> extends IBaseRequest<T> {}
