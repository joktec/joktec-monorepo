import {
  Body,
  Delete,
  Get,
  NestInterceptor,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { BaseService } from './base.service';
import { BaseListResponse, Constructor, IBaseRequest } from '../models';
import { includes, someIncludes, toArray, toBool, toPlural, toSingular } from '../utils';
import { isBoolean, isNil, startCase } from 'lodash';
import { JwtGuard, JwtPayload } from '../guards';
import { ApiSchema } from '../swagger';
import { QueryInterceptor } from '../interceptors';
import { BaseValidationPipe } from '../validation';
import { GatewayMetric } from '../infras';
import { ExceptionMessage, MethodNotAllowedException, ServiceUnavailableException } from '../exceptions';

export type ControllerMethod = 'findAll' | 'findOne' | 'create' | 'update' | 'delete';

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
  useGuard?: boolean | { [key in ControllerMethod]: boolean };
  excludes?: ControllerExclude[];
  hooks?: { [key in ControllerMethod]?: (NestInterceptor | Function)[] };
  metric?: boolean;
}

export const BaseController = <T extends object, ID>(props: IBaseControllerProps<T>): any => {
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

    protected checkMethod(...methodExcludes: ControllerExclude[]) {
      if (excludes.includes(ControllerExclude.ALL))
        throw new ServiceUnavailableException(ExceptionMessage.UNDERGOING_MAINTENANCE);
      if (someIncludes(excludes, ...methodExcludes)) throw new MethodNotAllowedException();
    }

    @Get('/')
    @ApiOperation({ summary: `List ${namePlural}` })
    @ApiOkResponse({ type: PaginationDto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.READ, ControllerExclude.LIST))
    async findAll(@Query() req: IBaseRequest<T>, @Req() res: Request): Promise<PaginationDto> {
      this.checkMethod(ControllerExclude.READ, ControllerExclude.LIST);
      return this.service.findAll(req, res['payload'] as JwtPayload);
    }

    @Get('/:id')
    @ApiOperation({ summary: `Get ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.READ, ControllerExclude.GET))
    @ApiParam({ name: 'id' })
    async findOne(@Param('id') id: ID, @Query() req: IBaseRequest<T>, @Req() res: Request): Promise<T> {
      this.checkMethod(ControllerExclude.READ, ControllerExclude.GET);
      return this.service.findOne(id, req, res['payload'] as JwtPayload);
    }

    @Post('/')
    @ApiOperation({ summary: `Create ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiBody({ type: props.dto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.CREATE))
    @UsePipes(new BaseValidationPipe())
    async create(@Body() entity: T, @Req() res: Request): Promise<T> {
      this.checkMethod(ControllerExclude.WRITE, ControllerExclude.CREATE);
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
      this.checkMethod(ControllerExclude.WRITE, ControllerExclude.UPDATE);
      return this.service.update(id, entity, res['payload'] as JwtPayload);
    }

    @Delete('/:id')
    @ApiOperation({ summary: `Delete ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.DELETE))
    async delete(@Param('id') id: ID, @Req() res: Request): Promise<T> {
      this.checkMethod(ControllerExclude.WRITE, ControllerExclude.DELETE);
      return this.service.delete(id, res['payload'] as JwtPayload);
    }
  }

  if (isBoolean(props.useGuard) || isNil(props.useGuard)) {
    const useGuard = toBool(props.useGuard, true);
    if (useGuard) {
      UseGuards(JwtGuard)(Controller);
      ApiBearerAuth()(Controller);
    }
  } else {
    Object.entries(props.useGuard || {}).map(([method, useGuard]) => {
      if (useGuard) {
        const descriptor = Object.getOwnPropertyDescriptor(Controller.prototype, method);
        UseGuards(JwtGuard)(Controller.prototype, method, descriptor);
        ApiBearerAuth()(Controller.prototype, method, descriptor);
      }
    });
  }

  const metric = toBool(props.metric, true);
  if (metric) {
    UseInterceptors(GatewayMetric)(Controller);
  }

  Object.keys(props?.hooks || {}).map(key => {
    const hookByKey = toArray(props.hooks[key]);
    if (key === 'findAll' || key === 'findOne') hookByKey.unshift(QueryInterceptor);
    if (hookByKey.length) {
      const descriptor = Object.getOwnPropertyDescriptor(Controller.prototype, key);
      UseInterceptors(...hookByKey)(Controller.prototype, key, descriptor);
    }
  });

  return Controller;
};
