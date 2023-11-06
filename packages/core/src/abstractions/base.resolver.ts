import { Inject, OnModuleInit, Type } from '@nestjs/common';
import { Args, Mutation, ObjectType, Query } from '@nestjs/graphql';
import { startCase } from 'lodash';
import { ConfigService } from '../config';
import { Jwt, JwtPayload } from '../guards';
import { LogService } from '../logger';
import { BaseListResponse, Constructor, Entity, IBaseRequest } from '../models';
import { toPlural, toSingular } from '../utils';
import { IBaseController } from './base.interface';
import { BaseService } from './base.service';

export interface IBaseResolverProps<T extends Entity> {
  dto: Constructor<T>;
  dtoName?: string;
}

export const BaseResolver = <T extends Entity, ID>(props: IBaseResolverProps<T>): Type<IBaseController<T, ID>> => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const namePlural = toPlural(nameSingular);

  @ObjectType(`${nameSingular}Pagination`)
  class PaginationDto extends BaseListResponse<T>(props.dto) {}

  class Resolver implements IBaseController<T, ID>, OnModuleInit {
    @Inject() public readonly configService: ConfigService;
    @Inject() public readonly logService: LogService;

    constructor(protected service: BaseService<T, ID>) {}

    onModuleInit() {
      this.logService.setContext(this.constructor.name);
    }

    @Query(() => PaginationDto, { name: `list${namePlural}` })
    async findAll(
      @Args('query', { type: () => PaginationDto, nullable: true, defaultValue: {} }) req: IBaseRequest<T>,
    ): Promise<PaginationDto> {
      return this.service.paginate(req);
    }

    @Query(() => props.dto, { name: `get${nameSingular}` })
    async findOne(
      @Args('id', { type: () => String }) id: ID,
      @Args('query', { type: () => PaginationDto, nullable: true, defaultValue: {} }) req: IBaseRequest<T>,
    ): Promise<T> {
      return this.service.findById(id, req);
    }

    @Mutation(() => props.dto, { name: `create${nameSingular}` })
    async create(@Args('input', { type: () => props.dto }) entity: T, @Jwt() payload?: JwtPayload): Promise<T> {
      return this.service.create(entity, payload);
    }

    @Mutation(() => props.dto, { name: `update${nameSingular}` })
    async update(
      @Args('id', { type: () => String }) id: ID,
      @Args('input', { type: () => props.dto }) entity: T,
      @Jwt() payload?: JwtPayload,
    ): Promise<T> {
      return this.service.update(id, entity, payload);
    }

    @Mutation(() => props.dto, { name: `delete${nameSingular}` })
    async delete(@Args('id', { type: () => String }) id: ID, @Jwt() payload?: JwtPayload): Promise<T> {
      return this.service.delete(id, payload);
    }
  }

  return Resolver;
};
