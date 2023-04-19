import { Args, Mutation, ObjectType, Query } from '@nestjs/graphql';
import { startCase } from 'lodash';
import { toPlural, toSingular } from '../utils';
import { BaseService } from './base.service';
import { BaseListResponse, Constructor, IBaseRequest, IListResponseDto } from '../models';

export interface IBaseResolverProps<T> {
  dto: Constructor<T>;
  dtoName?: string;
}

export const BaseResolver = <T, ID>(props: IBaseResolverProps<T>): any => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const namePlural = toPlural(nameSingular);

  @ObjectType(`${nameSingular}Pagination`)
  class PaginationDto extends BaseListResponse<T>(props.dto) {}

  abstract class Resolver {
    protected constructor(protected service: BaseService<T, ID>) {}

    @Query(() => PaginationDto, { name: `list${namePlural}` })
    async findAll(
      @Args('query', { type: () => PaginationDto, nullable: true, defaultValue: {} })
      req: IBaseRequest,
    ): Promise<PaginationDto> {
      return this.service.findAll(req);
    }

    @Query(() => props.dto, { name: `get${nameSingular}` })
    async findOne(@Args('id', { type: () => String }) id: ID): Promise<T> {
      return this.service.findOne(id);
    }

    @Mutation(() => props.dto, { name: `create${nameSingular}` })
    async create(@Args('input', { type: () => props.dto }) entity: T): Promise<T> {
      return this.service.create(entity);
    }

    @Mutation(() => props.dto, { name: `update${nameSingular}` })
    async update(
      @Args('id', { type: () => String }) id: ID,
      @Args('input', { type: () => props.dto }) entity: T,
    ): Promise<T> {
      return this.service.update(id, entity);
    }

    @Mutation(() => props.dto, { name: `delete${nameSingular}` })
    async delete(@Args('id', { type: () => String }) id: ID): Promise<T> {
      return this.service.delete(id);
    }
  }

  return Resolver;
};
