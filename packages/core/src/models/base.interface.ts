import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { DeepPartial, Entity, IBaseRequest, ICondition, ILanguage, IListResponseDto, IResponseDto } from '../models';
import { ConfigService, LogService } from '../modules';

export interface IBaseController<T, ID> {
  configService?: ConfigService;

  logService?: LogService;

  paginate(query: IBaseRequest<T>): Promise<IListResponseDto<T>>;

  detail(id: ID, query: IBaseRequest<T>): Promise<T>;

  create(entity: DeepPartial<T>): Promise<T>;

  update(id: ID, entity: DeepPartial<T>): Promise<T>;

  delete(id: ID): Promise<T>;
}

export interface IBaseService<T, ID, REQ> {
  configService?: ConfigService;

  logService?: LogService;

  paginate(req: REQ): Promise<IListResponseDto<T>>;

  find(req: REQ): Promise<T[]>;

  findOne(req: REQ): Promise<T>;

  create(entity: DeepPartial<T>): Promise<T>;

  update(id: ID, entity: DeepPartial<T>): Promise<T>;

  delete(id: ID): Promise<T>;

  restore(id: ID): Promise<T>;
}

export interface IBaseRepository<T extends Entity, ID> {
  paginate(query: IBaseRequest<T>): Promise<{
    items: T[];
    total: number;
    prevCursor?: string;
    currentCursor?: string;
    nextCursor?: string;
  }>;

  find(query: IBaseRequest<T>): Promise<T[]>;

  count(query: IBaseRequest<T>): Promise<number>;

  findOne(query: IBaseRequest<T>): Promise<T>;

  findById(id: ID, query?: IBaseRequest<T>): Promise<T>;

  create(body: DeepPartial<T>, opts?: { language?: ILanguage }): Promise<T>;

  update(condition: ICondition<T>, body: DeepPartial<T>, opts?: { language?: ILanguage }): Promise<T>;

  delete(condition: ICondition<T>, opts?: { force?: boolean; userId?: any }): Promise<T>;

  restore(condition: ICondition<T>, opts?: { userId?: any }): Promise<T>;
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
