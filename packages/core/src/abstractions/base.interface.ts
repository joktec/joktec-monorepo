import { ConfigService } from '../config';
import { JwtPayload } from '../guards';
import { LogService } from '../logger';
import { DeepPartial, IBaseRequest, IListResponseDto } from '../models';

export interface IBaseController<T, ID> {
  configService?: ConfigService;

  logService?: LogService;

  findAll(query: IBaseRequest<T>): Promise<IListResponseDto<T>>;

  findOne(id: ID, query: IBaseRequest<T>): Promise<T>;

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
