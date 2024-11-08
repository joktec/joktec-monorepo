import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import {
  DeepPartial,
  Entity,
  IBaseRequest,
  ICondition,
  IResponseDto,
  IPaginationResponse,
  Dictionary,
  KeyOf,
} from '../models';
import { ConfigService, LogService } from '../modules';

export interface IBaseController<T, ID> {
  configService?: ConfigService;

  logService?: LogService;

  paginate(query: IBaseRequest<T>): Promise<IPaginationResponse<T>>;

  detail(id: ID, query: IBaseRequest<T>): Promise<T>;

  create(entity: DeepPartial<T>): Promise<T>;

  update(id: ID, entity: DeepPartial<T>): Promise<T>;

  delete(id: ID): Promise<T>;
}

export interface IBaseService<T, ID, REQ> {
  configService?: ConfigService;

  logService?: LogService;

  paginate(req: REQ): Promise<IPaginationResponse<T>>;

  find(req: REQ): Promise<T[]>;

  findOne(req: REQ): Promise<T>;

  create(entity: DeepPartial<T>): Promise<T>;

  update(id: ID, entity: DeepPartial<T>): Promise<T>;

  delete(id: ID): Promise<T>;

  restore(id: ID): Promise<T>;
}

export interface IBaseRepository<T extends Entity, ID> {
  paginate(query: IBaseRequest<T>): Promise<IPaginationResponse<T>>;

  find(query: IBaseRequest<T>): Promise<T[]>;

  count(query: IBaseRequest<T>): Promise<number>;

  findOne(cond: ID | ICondition<T>, query?: Omit<IBaseRequest<T>, 'condition'>, opts?: Dictionary): Promise<T>;

  create(body: DeepPartial<T>, opts?: Dictionary): Promise<T>;

  update(cond: ID | ICondition<T>, body: DeepPartial<T>, opts?: Dictionary): Promise<T>;

  delete(cond: ID | ICondition<T>, opts?: Dictionary & { force?: boolean }): Promise<T>;

  restore(cond: ID | ICondition<T>, opts?: Dictionary): Promise<T>;

  upsert(body: DeepPartial<T>, onConflicts: KeyOf<T>[], opts?: Dictionary): Promise<T>;

  bulkUpsert(docs: Array<DeepPartial<T>>, onConflicts?: KeyOf<T>[], opts?: Dictionary): Promise<T[]>;
}

export interface IExceptionFilter extends ExceptionFilter {
  transformStatus(exception: Error): number;

  transformError(exception: Error): any;

  transformMessage(exception: Error): string;

  transformTitle(exception: Error): string;

  transformCode(exception: Error): number;

  debug(exception: Error): void;

  minify(host: ArgumentsHost, errorBody: IResponseDto): IResponseDto;
}
