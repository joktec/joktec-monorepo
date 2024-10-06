import { Inject, OnModuleInit } from '@nestjs/common';
import {
  DeepPartial,
  Entity,
  IPaginationResponse,
  IBaseRepository,
  IBaseRequest,
  IBaseService,
  ICondition,
} from '../models';
import { ConfigService, LogService } from '../modules';
import { cloneInstance } from '../utils';

export abstract class BaseService<T extends Entity, ID = string, REQ extends IBaseRequest<T> = IBaseRequest<T>>
  implements OnModuleInit, IBaseService<T, ID, REQ>
{
  @Inject() public readonly logService: LogService;
  @Inject() public readonly configService: ConfigService;

  protected constructor(protected repository: IBaseRepository<T, ID>) {}

  onModuleInit() {
    this.logService.setContext(this.constructor.name);
    this.afterModuleInit();
  }

  protected afterModuleInit() {}

  public transformPaginate<DTO = T>(items: DTO[], total: number, query: REQ): IPaginationResponse<DTO> {
    if (query.page) {
      const { page, limit } = query;
      if (!items.length) return { items, total, prevPage: null, currPage: page, nextPage: null, lastPage: null };
      const lastPage = Math.ceil(total / limit);
      const nextPage = page + 1 > lastPage ? null : page + 1;
      const prevPage = page - 1 < 1 ? null : page - 1;
      return { items, total, prevPage, currPage: page, nextPage, lastPage };
    }

    const { limit, offset } = query;
    if (!items.length) {
      return { items, total, prevOffset: null, currOffset: offset, nextOffset: null, lastOffset: null };
    }
    const lastOffset = Math.max(0, total - limit);
    const nextOffset = offset + limit >= total ? null : offset + limit;
    const prevOffset = offset - limit < 0 ? null : offset - limit;
    return { items, total, prevOffset, currOffset: offset, nextOffset, lastOffset };
  }

  async paginate(query: REQ): Promise<IPaginationResponse<T>> {
    const responseDto = await this.repository.paginate(query);
    const { items, total } = responseDto;
    return this.transformPaginate(items, total, query);
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
    const processEntity: DeepPartial<T> = cloneInstance(entity);
    return this.repository.create(processEntity);
  }

  async update(id: ID, entity: DeepPartial<T>): Promise<T> {
    const condition: ICondition<T> = { id } as object;
    const processEntity: DeepPartial<T> = cloneInstance(entity);
    return this.repository.update(condition, processEntity);
  }

  async delete(id: ID): Promise<T> {
    const condition: ICondition<T> = { id } as object;
    return this.repository.delete(condition);
  }

  async restore(id: ID): Promise<T> {
    const condition: ICondition<T> = { id } as object;
    return this.repository.restore(condition);
  }
}
