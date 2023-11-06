import { Inject, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config';
import { JwtPayload } from '../guards';
import { LogService } from '../logger';
import { DeepPartial, Entity, IBaseRequest, ICondition, IListResponseDto } from '../models';
import { cloneInstance } from '../utils';
import { IBaseService } from './base.interface';
import { BaseRepository } from './base.repository';

export abstract class BaseService<T extends Entity, ID = string, REQ extends IBaseRequest<T> = IBaseRequest<T>>
  implements OnModuleInit, IBaseService<T, ID, REQ>
{
  @Inject() public readonly configService: ConfigService;
  @Inject() public readonly logService: LogService;

  protected constructor(protected repository: BaseRepository<T, ID>) {}

  onModuleInit() {
    this.logService.setContext(this.constructor.name);
  }

  async paginate(query: REQ): Promise<IListResponseDto<T>> {
    const [items, totalItems] = await Promise.all([this.repository.find(query), this.repository.count(query)]);
    const totalPage = Math.ceil(totalItems / query.limit);
    const isLastPage = items.length < query.limit;
    return { items, totalItems, totalPage, isLastPage };
  }

  async find(query: REQ): Promise<T[]> {
    return this.repository.find(query);
  }

  async findById(id: ID, query?: REQ): Promise<T> {
    const processQuery: REQ = { ...query, condition: { id } };
    return this.repository.findOne(processQuery);
  }

  async findOne(query: REQ): Promise<T> {
    return this.repository.findOne(query);
  }

  async create(entity: DeepPartial<T>, payload?: JwtPayload): Promise<T> {
    const processEntity: DeepPartial<T> = cloneInstance(entity);
    if (payload) {
      Object.assign(processEntity, { createdBy: payload.sub, updatedBy: payload.sub });
    }
    return this.repository.create(processEntity);
  }

  async update(id: ID, entity: DeepPartial<T>, payload?: JwtPayload): Promise<T> {
    const condition: ICondition<T> = { id } as object;
    const processEntity: DeepPartial<T> = cloneInstance(entity);
    if (payload) {
      Object.assign(processEntity, { updatedBy: payload.sub });
    }
    return this.repository.update(condition, processEntity);
  }

  async delete(id: ID, payload?: JwtPayload): Promise<T> {
    const condition: ICondition<T> = { id } as object;
    return this.repository.delete(condition, { userId: payload?.sub });
  }

  async restore(id: ID, payload?: JwtPayload): Promise<T> {
    const condition: ICondition<T> = { id } as object;
    return this.repository.restore(condition, { userId: payload?.sub });
  }
}
