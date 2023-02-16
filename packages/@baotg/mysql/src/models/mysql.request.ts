import { IDataType, IBaseRequest } from '@baotg/core';

export type MysqlId = string | number | bigint;
export type ArrayBinding = Array<IDataType>;
export type DictBinding = { [key: string]: IDataType };
export type RawBinding = ArrayBinding | DictBinding;

export interface IMysqlRequest extends IBaseRequest {}
