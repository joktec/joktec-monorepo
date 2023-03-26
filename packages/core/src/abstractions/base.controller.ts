import { Body, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BaseService } from './base.service';
import { IBaseRequest, IListResponseDto } from '../models';
import { QueryInterceptor } from '../interceptors';
import { toBool, toPlural, toSingular } from '../utils';
import { startCase } from 'lodash';
import { JwtGuard, JwtPayload } from '../guards';

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

  @ApiTags(apiTag.toLowerCase())
  abstract class Controller {
    protected constructor(protected service: BaseService<T, ID>) {}

    @Get('/')
    @ApiOperation({ summary: `List ${namePlural}` })
    @ApiOkResponse({ type: props.dtoList })
    @UseInterceptors(QueryInterceptor)
    async findAll(@Query() req: IBaseRequest, @Req() res: Request): Promise<IListResponseDto<T>> {
      return this.service.findAll(req, res['payload'] as JwtPayload);
    }

    @Get('/:id')
    @ApiOperation({ summary: `Get ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    async findOne(@Param('id') id: ID, @Req() res: Request): Promise<T> {
      return this.service.findOne(id, res['payload'] as JwtPayload);
    }

    @Post('/')
    @ApiOperation({ summary: `Create ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiBody({ type: props.dto })
    async create(@Body() entity: T, @Req() res: Request): Promise<T> {
      return this.service.create(entity, res['payload'] as JwtPayload);
    }

    @Put('/:id')
    @ApiOperation({ summary: `Update ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiBody({ type: props.dto })
    async update(@Param('id') id: ID, @Body() entity: Partial<T>, @Req() res: Request): Promise<T> {
      return this.service.update(id, entity, res['payload'] as JwtPayload);
    }

    @Delete('/:id')
    @ApiOperation({ summary: `Delete ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    async delete(@Param('id') id: ID, @Req() res: Request): Promise<T> {
      return this.service.delete(id, res['payload'] as JwtPayload);
    }
  }

  const useGuard = toBool(props.useGuard, true);
  if (useGuard) {
    UseGuards(JwtGuard)(Controller);
    ApiBearerAuth()(Controller);
  }

  return Controller;
};
