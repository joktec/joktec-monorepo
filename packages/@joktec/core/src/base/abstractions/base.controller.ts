import { Body, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BaseService } from './base.service';
import { IBaseRequest, IListResponseDto } from '../models';
import { QueryInterceptor, ResponseInterceptor } from './base.interceptor';
import { toPlural, toSingular } from '../../utils';
import { startCase } from 'lodash';

export interface IBaseControllerProps<T> {
  dto: new (...args: any) => T;
  dtoList: new (...args: any) => any;
  dtoName?: string;
  apiTag?: string;
}

export const BaseController = <T, ID>(props: IBaseControllerProps<T>): any => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const namePlural = toPlural(nameSingular);
  const apiTag = props.apiTag || nameSingular;

  @ApiTags(apiTag)
  @UseInterceptors(ResponseInterceptor)
  abstract class Controller {
    protected constructor(protected service: BaseService<T, ID>) {}

    @Get('/')
    @ApiOperation({ summary: `List ${namePlural}` })
    @ApiOkResponse({ type: props.dtoList })
    @ApiForbiddenResponse()
    @UseInterceptors(QueryInterceptor)
    async findAll(@Query() req: IBaseRequest): Promise<IListResponseDto<T>> {
      return this.service.findAll(req);
    }

    @Get('/:id')
    @ApiOperation({ summary: `Get ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiNotFoundResponse()
    @ApiParam({ name: 'id' })
    async findOne(@Param('id') id: ID): Promise<T> {
      return this.service.findOne(id);
    }

    @Post('/')
    @ApiOperation({ summary: `Create ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiForbiddenResponse()
    @ApiBody({ type: props.dto })
    async create(@Body() entity: T): Promise<T> {
      return this.service.create(entity);
    }

    @Put('/:id')
    @ApiOperation({ summary: `Update ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiNotFoundResponse()
    @ApiForbiddenResponse()
    @ApiParam({ name: 'id' })
    @ApiBody({ type: props.dto })
    async update(@Param('id') id: ID, @Body() entity: T): Promise<T> {
      return this.service.update(id, entity);
    }

    @Delete('/:id')
    @ApiOperation({ summary: `Delete ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiNotFoundResponse()
    @ApiForbiddenResponse()
    @ApiParam({ name: 'id' })
    async delete(@Param('id') id: ID): Promise<T> {
      return this.service.delete(id);
    }
  }

  return Controller;
};
