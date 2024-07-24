import { Inject, OnModuleInit } from '@nestjs/common';
import { REQUEST } from '../base';
import {
  DeepPartial,
  Entity,
  ExpressRequest,
  IBaseRepository,
  IBaseRequest,
  IBaseService,
  ICondition,
  IListResponseDto,
} from '../models';
import { ConfigService, LogService } from '../modules';
import { cloneInstance } from '../utils';

export abstract class BaseService<T extends Entity, ID = string, REQ extends IBaseRequest<T> = IBaseRequest<T>>
  implements OnModuleInit, IBaseService<T, ID, REQ>
{
  @Inject(REQUEST) public request: ExpressRequest;
  @Inject() public readonly logService: LogService;
  @Inject() public readonly configService: ConfigService;

  protected constructor(protected repository: IBaseRepository<T, ID>) {}

  onModuleInit() {
    this.logService.setContext(this.constructor.name);
  }

  async paginate(query: REQ): Promise<IListResponseDto<T>> {
    const responseDto = await this.repository.paginate(query);

    const { items, total } = responseDto;
    if (responseDto.currentCursor) {
      const { prevCursor, currentCursor, nextCursor } = responseDto;
      return { items, total, prevCursor, currentCursor, nextCursor };
    }

    const lastPage = Math.ceil(total / query.limit);
    const nextPage = query.page + 1 > lastPage ? null : query.page + 1;
    const prevPage = query.page - 1 < 1 ? null : query.page - 1;
    return { items, total, lastPage, nextPage, prevPage };
  }

  async find(query: REQ): Promise<T[]> {
    return this.repository.find(query);
  }

  async findById(id: ID, query?: REQ): Promise<T> {
    return this.repository.findById(id, query);
  }

  async findOne(query: REQ): Promise<T> {
    return this.repository.findOne(query);
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const language = this.request.query.language;
    const processEntity: DeepPartial<T> = cloneInstance(entity);
    return this.repository.create(processEntity, { language });
  }

  async update(id: ID, entity: DeepPartial<T>): Promise<T> {
    const language = this.request.query.language;
    const condition: ICondition<T> = { id } as object;
    const processEntity: DeepPartial<T> = cloneInstance(entity);
    return this.repository.update(condition, processEntity, { language });
  }

  async delete(id: ID): Promise<T> {
    const condition: ICondition<T> = { id } as object;
    const opts = { userId: null };
    if (this.request.payload) {
      const payload = this.request.payload;
      Object.assign(opts, { userId: payload.sub });
    }
    return this.repository.delete(condition, opts);
  }

  async restore(id: ID): Promise<T> {
    const condition: ICondition<T> = { id } as object;
    const opts = { userId: null };
    if (this.request.payload) {
      const payload = this.request.payload;
      Object.assign(opts, { userId: payload.sub });
    }
    return this.repository.restore(condition, opts);
  }
}
