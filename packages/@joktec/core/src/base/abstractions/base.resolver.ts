import { Args, Mutation, Query } from '@nestjs/graphql';
import { startCase } from 'lodash';
import { toPlural, toSingular } from '../../utils';
import { BaseService } from './base.service';
import { IBaseRequest, IListResponseDto } from '../models';

export interface IBaseResolverProps<T> {
  dto: new (...args: any) => T;
  dtoList: new (...args: any) => IListResponseDto<T>;
  dtoName?: string;
}

export const BaseResolver = <T, ID>(props: IBaseResolverProps<T>): any => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const namePlural = toPlural(nameSingular);

  abstract class Resolver {
    protected constructor(protected service: BaseService<T, ID>) {}

    @Query(() => props.dtoList, { name: `list${namePlural}` })
    async findAll(
      @Args('query', { type: () => props.dtoList, nullable: true, defaultValue: {} })
      req: IBaseRequest,
    ): Promise<IListResponseDto<T>> {
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
};
