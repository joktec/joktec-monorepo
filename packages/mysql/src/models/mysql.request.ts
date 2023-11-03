import { IBaseRequest, IDataType } from '@joktec/core';
import { MysqlModel } from './mysql.model';

export type MysqlId = string | number | bigint;
export type ArrayBinding = Array<IDataType>;
export type DictBinding = { [key: string]: IDataType };
export type RawBinding = ArrayBinding | DictBinding;

export interface IMysqlRequest<T extends MysqlModel<T>> extends IBaseRequest<T> {}
