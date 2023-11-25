import {
  Body,
  CanActivate,
  Delete,
  ExceptionFilter,
  Get,
  Inject,
  NestInterceptor,
  OnModuleInit,
  Param,
  PipeTransform,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Type,
  applyDecorators,
} from '@nestjs/common';
import { UseFilters } from '@nestjs/common/decorators/core';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { isFunction, startCase } from 'lodash';
import { ConfigService } from '../config';
import { HttpRequestHeader, HttpStatus } from '../constants';
import { HttpResponse } from '../decorators';
import {
  ExceptionMessage,
  MethodNotAllowedException,
  NotFoundException,
  ServiceUnavailableException,
} from '../exceptions';
import { Jwt, JwtPayload } from '../guards';
import { GatewayMetric } from '../infras';
import { QueryInterceptor } from '../interceptors';
import { LogService } from '../logger';
import {
  BaseListResponse,
  Clazz,
  Constructor,
  DeepPartial,
  Entity,
  IBaseController,
  IBaseRequest,
  ICacheStrategy,
  IControllerMethod,
} from '../models';
import { ApiSchema } from '../swagger';
import { includes, someIncludes, toArray, toBool, toPlural, toSingular } from '../utils';
import { BaseValidationPipe } from '../validation';
import { BaseService } from './base.service';

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

export interface IControllerProps<T extends Entity> {
  dto: Constructor<T>;
  dtoName?: string;
  customDto?: {
    queryDto?: Constructor<DeepPartial<T>> | Clazz;
    createDto?: Constructor<DeepPartial<T>> | Clazz;
    updatedDto?: Constructor<DeepPartial<T>> | Clazz;
  };
  tag?: string;
  excludes?: ControllerExclude[];
  metric?: boolean;
  bearer?: (CanActivate | Function) | { [key in IControllerMethod]?: CanActivate | Function };
  apiKey?: (CanActivate | Function) | { [key in IControllerMethod]?: CanActivate | Function };
  guards?: (CanActivate | Function) | { [key in IControllerMethod]?: (CanActivate | Function)[] };
  pipes?: { [key in IControllerMethod]?: (PipeTransform | Function)[] };
  hooks?: { [key in IControllerMethod]?: (NestInterceptor | Function)[] };
  filter?: ExceptionFilter | Function;
  caching?: ICacheStrategy;
  decorators?: { [key in IControllerMethod]?: MethodDecorator[] };
}

export const BaseController = <T extends Entity, ID>(props: IControllerProps<T>): Type<IBaseController<T, ID>> => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const namePlural = toPlural(nameSingular);
  const tag = props.tag || toPlural(dtoName);
  const excludes = toArray<ControllerExclude>(props.excludes);

  const queryDto: Constructor<T | any> = props?.customDto?.queryDto || props.dto;
  const createDto: Constructor<T | any> = props.customDto?.createDto || props.dto;
  const updatedDto: Constructor<T | any> = props.customDto?.updatedDto || createDto;

  const { caching } = props;
  const combineDecorators: { [key in IControllerMethod]?: MethodDecorator[] } = {
    paginate: [...toArray(caching?.paginate)],
    detail: [...toArray(caching?.detail)],
    create: [...toArray(caching?.create)],
    update: [...toArray(caching?.update)],
    delete: [...toArray(caching?.delete)],
  };

  @ApiSchema({ name: `${nameSingular}Pagination` })
  class PaginationDto extends BaseListResponse<T>(props.dto) {}

  @ApiTags(tag.toLowerCase())
  @ApiExcludeController(includes(excludes, ControllerExclude.ALL))
  class Controller implements IBaseController<T, ID>, OnModuleInit {
    @Inject() public readonly configService: ConfigService;
    @Inject() public readonly logService: LogService;

    constructor(protected service: BaseService<T, ID>) {}

    onModuleInit() {
      this.logService.setContext(this.constructor.name);
    }

    private checkMethod(...methodExcludes: ControllerExclude[]) {
      if (excludes.includes(ControllerExclude.ALL))
        throw new ServiceUnavailableException(ExceptionMessage.UNDERGOING_MAINTENANCE);
      if (someIncludes(excludes, ...methodExcludes)) throw new MethodNotAllowedException();
    }

    @Get('/')
    @ApiOperation({ summary: `List ${namePlural}` })
    @ApiOkResponse({ type: PaginationDto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.READ, ControllerExclude.LIST))
    @UsePipes(...toArray(props.pipes?.paginate))
    @UseInterceptors(QueryInterceptor, ...toArray(props.hooks?.paginate))
    @HttpResponse(HttpStatus.OK)
    @applyDecorators(...combineDecorators.paginate)
    async paginate(@Query() query: IBaseRequest<typeof queryDto>): Promise<PaginationDto> {
      this.checkMethod(ControllerExclude.READ, ControllerExclude.LIST);
      return this.service.paginate(query);
    }

    @Get('/:id')
    @ApiOperation({ summary: `Get ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.READ, ControllerExclude.GET))
    @ApiParam({ name: 'id' })
    @UsePipes(...toArray(props.pipes?.detail))
    @UseInterceptors(QueryInterceptor, ...toArray(props.hooks?.detail))
    @HttpResponse(HttpStatus.OK)
    @applyDecorators(...combineDecorators.detail)
    async detail(@Param('id') id: ID, @Query() query: IBaseRequest<typeof queryDto>): Promise<T> {
      this.checkMethod(ControllerExclude.READ, ControllerExclude.GET);
      const detail = await this.service.findById(id, query);
      if (!detail) throw new NotFoundException();
      return detail;
    }

    @Post('/')
    @ApiOperation({ summary: `Create ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiBody({ type: createDto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.CREATE))
    @UsePipes(new BaseValidationPipe(), ...toArray(props.pipes?.create))
    @UseInterceptors(...toArray(props.hooks?.create))
    @HttpResponse(HttpStatus.CREATED)
    @applyDecorators(...combineDecorators.create)
    async create(@Body() entity: DeepPartial<T>, @Jwt() payload?: JwtPayload): Promise<T> {
      this.checkMethod(ControllerExclude.WRITE, ControllerExclude.CREATE);
      return this.service.create(entity, payload);
    }

    @Put('/:id')
    @ApiOperation({ summary: `Update ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiBody({ type: updatedDto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.UPDATE))
    @UsePipes(new BaseValidationPipe({ skipMissingProperties: true }), ...toArray(props.pipes?.update))
    @UseInterceptors(...toArray(props.hooks?.update))
    @HttpResponse(HttpStatus.OK)
    @applyDecorators(...combineDecorators.update)
    async update(@Param('id') id: ID, @Body() entity: DeepPartial<T>, @Jwt() payload?: JwtPayload): Promise<T> {
      this.checkMethod(ControllerExclude.WRITE, ControllerExclude.UPDATE);
      const detail = await this.service.update(id, entity, payload);
      if (!detail) throw new NotFoundException();
      return detail;
    }

    @Delete('/:id')
    @ApiOperation({ summary: `Delete ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.DELETE))
    @UsePipes(...toArray(props.pipes?.delete))
    @UseInterceptors(...toArray(props.hooks?.delete))
    @HttpResponse(HttpStatus.NO_CONTENT)
    @applyDecorators(...combineDecorators.delete)
    async delete(@Param('id') id: ID, @Jwt() payload?: JwtPayload): Promise<T | null> {
      this.checkMethod(ControllerExclude.WRITE, ControllerExclude.DELETE);
      const detail = await this.service.delete(id, payload);
      if (!detail) throw new NotFoundException();
      return null;
    }
  }

  if (props.bearer) {
    const bearer = props.bearer;
    if (isFunction(bearer) || 'canActivate' in bearer) {
      UseGuards(bearer)(Controller);
      ApiBearerAuth()(Controller);
    } else {
      Object.entries(bearer).map(([method, decorator]) => {
        const descriptor = Object.getOwnPropertyDescriptor(Controller.prototype, method);
        UseGuards(decorator)(Controller.prototype, method, descriptor);
        ApiBearerAuth()(Controller.prototype, method, descriptor);
      });
    }
  }

  if (props.guards) {
    const guards = props.guards;
    if (isFunction(guards) || 'canActivate' in guards) {
      UseGuards(guards)(Controller);
      ApiBearerAuth()(Controller);
    } else {
      Object.entries(guards).map(([method, decorators]) => {
        const descriptor = Object.getOwnPropertyDescriptor(Controller.prototype, method);
        UseGuards(...decorators)(Controller.prototype, method, descriptor);
        ApiBearerAuth()(Controller.prototype, method, descriptor);
      });
    }
  }

  if (props.apiKey) {
    const apiKey = props.apiKey;
    if (isFunction(apiKey) || 'canActivate' in apiKey) {
      UseGuards(apiKey)(Controller);
      ApiSecurity(HttpRequestHeader.X_API_KEY)(Controller);
    } else {
      Object.entries(apiKey).map(([method, decorators]) => {
        const descriptor = Object.getOwnPropertyDescriptor(Controller.prototype, method);
        UseGuards(...decorators)(Controller.prototype, method, descriptor);
        ApiSecurity(HttpRequestHeader.X_API_KEY)(Controller.prototype, method, descriptor);
      });
    }
  }

  // Apply filter
  if (props.filter) {
    UseFilters(props.filter)(Controller);
  }

  // Apply Metric
  const metric = toBool(props.metric, true);
  if (metric) UseInterceptors(GatewayMetric)(Controller);

  // Apply Decorators
  if (props.decorators) {
    Object.entries(props.decorators).map(([method, decorators]) => {
      const descriptor = Object.getOwnPropertyDescriptor(Controller.prototype, method);
      decorators.map(decorator => decorator(Controller.prototype, method, descriptor));
    });
  }

  return Controller;
};
