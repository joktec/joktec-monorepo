import { Body, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { BaseService } from './base.service';
import { BaseListResponse, Constructor, IBaseRequest } from '../models';
import { QueryInterceptor } from '../interceptors';
import { includes, someIncludes, toArray, toBool, toPlural, toSingular } from '../utils';
import { startCase } from 'lodash';
import { JwtGuard, JwtPayload } from '../guards';
import { BaseValidationPipe } from '../validation';
import { ApiSchema } from '../swagger';

export enum ControllerExclude {
  ALL,
  LIST,
  GET,
  CREATE,
  UPDATE,
  DELETE,
  READ,
  WRITE,
}

export interface IBaseControllerProps<T> {
  dto: Constructor<T>;
  dtoName?: string;
  apiTag?: string;
  useGuard?: boolean;
  excludes?: ControllerExclude[];
}

export const BaseController = <T, ID>(props: IBaseControllerProps<T>): any => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const namePlural = toPlural(nameSingular);
  const apiTag = props.apiTag || toPlural(dtoName);
  const excludes = toArray<ControllerExclude>(props.excludes);

  @ApiSchema({ name: `${nameSingular}Pagination` })
  class PaginationDto extends BaseListResponse<T>(props.dto) {}

  @ApiTags(apiTag.toLowerCase())
  @ApiExcludeController(includes(excludes, ControllerExclude.ALL))
  abstract class Controller {
    protected constructor(protected service: BaseService<T, ID>) {}

    @Get('/')
    @ApiOperation({ summary: `List ${namePlural}` })
    @ApiOkResponse({ type: PaginationDto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.READ, ControllerExclude.LIST))
    @ApiQuery({ name: 'filters', type: Object, explode: true, required: false, style: 'deepObject' })
    @UseInterceptors(QueryInterceptor)
    async findAll(@Query() req: IBaseRequest, @Req() res: Request): Promise<PaginationDto> {
      return this.service.findAll(req, res['payload'] as JwtPayload);
    }

    @Get('/:id')
    @ApiOperation({ summary: `Get ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.READ, ControllerExclude.GET))
    @ApiParam({ name: 'id' })
    async findOne(@Param('id') id: ID, @Req() res: Request): Promise<T> {
      return this.service.findOne(id, res['payload'] as JwtPayload);
    }

    @Post('/')
    @ApiOperation({ summary: `Create ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiBody({ type: props.dto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.CREATE))
    @UsePipes(new BaseValidationPipe())
    async create(@Body() entity: T, @Req() res: Request): Promise<T> {
      return this.service.create(entity, res['payload'] as JwtPayload);
    }

    @Put('/:id')
    @ApiOperation({ summary: `Update ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiBody({ type: props.dto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.UPDATE))
    @UsePipes(new BaseValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: ID, @Body() entity: Partial<T>, @Req() res: Request): Promise<T> {
      return this.service.update(id, entity, res['payload'] as JwtPayload);
    }

    @Delete('/:id')
    @ApiOperation({ summary: `Delete ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.DELETE))
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
