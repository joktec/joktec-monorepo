import { FindOneOptions, SaveOptions } from 'typeorm';

export interface IMysqlOption<T = any> extends SaveOptions, FindOneOptions<T> {}
