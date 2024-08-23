import { Inject, OnModuleInit } from '@nestjs/common';
import {
  DeepPartial,
  Entity,
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
  @Inject() public readonly logService: LogService;
  @Inject() public readonly configService: ConfigService;

  protected constructor(protected repository: IBaseRepository<T, ID>) {}

  onModuleInit() {
    this.logService.setContext(this.constructor.name);
    this.afterModuleInit();
  }

  protected afterModuleInit() {}

  public transformPaginate<DTO = T>(items: DTO[], total: number, page: number, limit: number): IListResponseDto<DTO> {
    if (!items.length) return { items, total, lastPage: null, nextPage: null, prevPage: null };
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return { items, total, lastPage, nextPage, prevPage };
  }

  async paginate(query: REQ): Promise<IListResponseDto<T>> {
    const responseDto = await this.repository.paginate(query);

    const { items, total } = responseDto;
    if (responseDto.currentCursor) {
      const { prevCursor, currentCursor, nextCursor } = responseDto;
      return { items, total, prevCursor, currentCursor, nextCursor };
    }

    return this.transformPaginate(items, total, query.page, query.limit);
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
