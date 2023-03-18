import { Body, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BaseService } from './base.service';
import { IBaseRequest, IListResponseDto } from '../models';
import { QueryInterceptor, ResponseInterceptor } from './base.interceptor';
import { toBool, toPlural, toSingular } from '../utils';
import { startCase } from 'lodash';
import { JwtGuard, JwtUser, LoggedUser } from '../guards';

export interface IBaseControllerProps<T> {
  dto: new (...args: any) => T;
  dtoList: new (...args: any) => any;
  dtoName?: string;
  apiTag?: string;
  useGuard?: boolean;
}

export const BaseController = <T, ID>(props: IBaseControllerProps<T>): any => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const namePlural = toPlural(nameSingular);
  const apiTag = props.apiTag || toPlural(dtoName);

  @ApiTags(apiTag)
  @UseInterceptors(ResponseInterceptor)
  abstract class Controller {
    protected constructor(protected service: BaseService<T, ID>) {}

    @Get('/')
    @ApiOperation({ summary: `List ${namePlural}` })
    @ApiOkResponse({ type: props.dtoList })
    @UseInterceptors(QueryInterceptor)
    async findAll(@Query() req: IBaseRequest, @LoggedUser() loggedUser?: JwtUser): Promise<IListResponseDto<T>> {
      return this.service.findAll(req, loggedUser);
    }

    @Get('/:id')
    @ApiOperation({ summary: `Get ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    async findOne(@Param('id') id: ID, @LoggedUser() loggedUser?: JwtUser): Promise<T> {
      return this.service.findOne(id, loggedUser);
    }

    @Post('/')
    @ApiOperation({ summary: `Create ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiBody({ type: props.dto })
    async create(@Body() entity: T, @LoggedUser() loggedUser?: JwtUser): Promise<T> {
      return this.service.create(entity, loggedUser);
    }

    @Put('/:id')
    @ApiOperation({ summary: `Update ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiBody({ type: props.dto })
    async update(@Param('id') id: ID, @Body() entity: T, @LoggedUser() loggedUser?: JwtUser): Promise<T> {
      return this.service.update(id, entity, loggedUser);
    }

    @Delete('/:id')
    @ApiOperation({ summary: `Delete ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    async delete(@Param('id') id: ID, @LoggedUser() loggedUser?: JwtUser): Promise<T> {
      return this.service.delete(id, loggedUser);
    }
  }

  const useGuard = toBool(props.useGuard, true);
  if (useGuard) {
    UseGuards(JwtGuard)(Controller);
    ApiBearerAuth()(Controller);
  }

  return Controller;
};
