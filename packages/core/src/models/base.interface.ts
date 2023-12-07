import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { ConfigService } from '../config';
import { JwtPayload } from '../guards';
import { LogService } from '../logger';
import { DeepPartial, Entity, IBaseRequest, ICondition, IListResponseDto, IResponseDto } from '../models';

export type IControllerMethod = 'paginate' | 'detail' | 'create' | 'update' | 'delete';

export type ICacheStrategy = { [key in IControllerMethod]?: MethodDecorator };

export interface IBaseController<T, ID> {
  configService?: ConfigService;

  logService?: LogService;

  paginate(query: IBaseRequest<T>): Promise<IListResponseDto<T>>;

  detail(id: ID, query: IBaseRequest<T>): Promise<T>;

  create(entity: DeepPartial<T>, payload?: JwtPayload): Promise<T>;

  update(id: ID, entity: DeepPartial<T>, payload?: JwtPayload): Promise<T>;

  delete(id: ID, payload?: JwtPayload): Promise<T>;
}

export interface IBaseService<T, ID, REQ> {
  configService?: ConfigService;

  logService?: LogService;

  paginate(req: REQ): Promise<IListResponseDto<T>>;

  find(req: REQ): Promise<T[]>;

  findOne(req: REQ): Promise<T>;

  create(entity: DeepPartial<T>, payload?: JwtPayload): Promise<T>;

  update(id: ID, entity: DeepPartial<T>, payload?: JwtPayload): Promise<T>;

  delete(id: ID, payload?: JwtPayload): Promise<T>;

  restore(id: ID, payload?: JwtPayload): Promise<T>;
}

export interface IBaseRepository<T extends Entity, ID> {
  find(query: IBaseRequest<T>): Promise<T[]>;

  count(query: IBaseRequest<T>): Promise<number>;

  findOne(query: IBaseRequest<T>): Promise<T>;

  create(body: DeepPartial<T>): Promise<T>;

  update(condition: ICondition<T>, body: DeepPartial<T>): Promise<T>;

  delete(condition: ICondition<T>, opts?: { force?: boolean; userId?: any }): Promise<T>;

  restore(condition: ICondition<T>, opts?: { userId?: any }): Promise<T>;
}

export interface IExceptionFilter extends ExceptionFilter {
  debug(exception: Error): void;

  transformStatus(exception: Error): number;

  transformErrorData(exception: Error): any;

  transformErrorCode(exception: Error): number;

  transformMessage(exception: Error): string;

  minify(host: ArgumentsHost, errorBody: IResponseDto): IResponseDto;
}
