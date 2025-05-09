import { HttpStatus, toArray, toBool, toPlural, toSingular } from '@joktec/utils';
import {
  applyDecorators,
  Body,
  CanActivate,
  Delete,
  ExceptionFilter,
  Get,
  HttpCode,
  Inject,
  NestInterceptor,
  OnModuleInit,
  Param,
  PipeTransform,
  Post,
  Put,
  Query,
  Type,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UseFilters } from '@nestjs/common/decorators/core';
import {
  ApiBody,
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
import { startCase } from 'lodash';
import {
  ApiFilterQuery,
  ApiNotAllowedEndpoint,
  ApiSchema,
  ApiUseApiKey,
  ApiUseBearer,
  IApiFilterQueryOptions,
} from '../decorators';
import { NotFoundException } from '../exceptions';
import {
  Clazz,
  Constructor,
  DeepPartial,
  Entity,
  IBaseController,
  IBaseRequest,
  PagePaginationResponse,
} from '../models';
import { ConfigService, LogService } from '../modules';
import { BaseValidationPipe } from '../pipes';
import { BaseService } from './base.service';

export interface IEndpointProps {
  disable?: boolean;
  hidden?: boolean;
  useBearer?: boolean;
  useApiKey?: boolean | [boolean, string];
  guards?: (CanActivate | Function)[];
  pipes?: (PipeTransform | Function)[];
  hooks?: (NestInterceptor | Function)[];
  filters?: (ExceptionFilter | Function)[];
  decorators?: MethodDecorator[];
}

export interface IControllerProps<T extends Entity> extends IEndpointProps {
  dto: Constructor<T>;
  dtoName?: string;
  customDto?: {
    queryDto?: Constructor<IBaseRequest<T>> | Clazz;
    createDto?: Constructor<DeepPartial<T>> | Clazz;
    updatedDto?: Constructor<DeepPartial<T>> | Clazz;
  };
  tag?: string;
  paginate?: IEndpointProps & { search?: boolean } & IApiFilterQueryOptions;
  detail?: IEndpointProps;
  create?: IEndpointProps;
  update?: IEndpointProps;
  delete?: IEndpointProps;
}

const isHideEndpoint = (opts?: IEndpointProps): boolean => {
  if (toBool(opts?.disable, false)) return true;
  return toBool(opts?.hidden, false);
};

export const BaseController = <T extends Entity, ID>(props: IControllerProps<T>): Type<IBaseController<T, ID>> => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const namePlural = toPlural(nameSingular);
  const tag = props.tag || nameSingular;

  class DefaultQueryDto implements IBaseRequest<typeof props.dto> {}

  const queryDto: Constructor<any> = props.customDto?.queryDto || DefaultQueryDto;
  const createDto: Constructor<T | any> = props.customDto?.createDto || props.dto;
  const updatedDto: Constructor<T | any> = props.customDto?.updatedDto || PartialType(createDto);

  @ApiSchema({ name: `${nameSingular}QueryDto` })
  class QueryDto extends queryDto {}

  @ApiSchema({ name: `${nameSingular}Pagination` })
  class PaginationDto extends PagePaginationResponse<T>(props.dto) {}

  @ApiSchema({ name: `${nameSingular}CreateDto` })
  class CreateDto extends createDto {}

  @ApiSchema({ name: `${nameSingular}UpdateDto` })
  class UpdateDto extends updatedDto {}

  // Apply Metric
  const controllerHooks = toArray(props.hooks);

  @ApiTags(tag)
  @ApiExcludeController(toBool(props.hidden, false))
  @ApiUseBearer(props.useBearer)
  @ApiUseApiKey(props.useApiKey)
  @UseGuards(...toArray(props.guards))
  @UseInterceptors(...controllerHooks)
  @UsePipes(...toArray(props.pipes))
  @UseFilters(...toArray(props.filters))
  @applyDecorators(...toArray(props.decorators))
  class Controller implements IBaseController<T, ID>, OnModuleInit {
    @Inject() public readonly configService: ConfigService;
    @Inject() public readonly logService: LogService;

    constructor(protected service: BaseService<T, ID>) {}

    onModuleInit() {
      this.logService.setContext(this.constructor.name);
      this.afterModuleInit();
    }

    protected afterModuleInit() {}

    @Get('/')
    @ApiOperation({ summary: `List ${namePlural}` })
    @ApiFilterQuery({ ...props.paginate })
    @ApiOkResponse({ type: PaginationDto })
    @ApiExcludeEndpoint(isHideEndpoint(props.paginate))
    @ApiNotAllowedEndpoint(toBool(props.paginate?.disable, false))
    @ApiUseBearer(props.paginate?.useBearer)
    @ApiUseApiKey(props.paginate?.useApiKey)
    @UseGuards(...toArray(props.paginate?.guards))
    @UseInterceptors(...toArray(props.paginate?.hooks))
    @UsePipes(...toArray(props.paginate?.pipes))
    @UseFilters(...toArray(props.paginate?.filters))
    @applyDecorators(...toArray(props.paginate?.decorators))
    async paginate(@Query() query: QueryDto): Promise<PaginationDto> {
      return this.service.paginate(query);
    }

    @Post('/search')
    @ApiOperation({ summary: `Search ${namePlural}` })
    @ApiOkResponse({ type: PaginationDto })
    @ApiExcludeEndpoint(!toBool(props.paginate?.search, false))
    @ApiNotAllowedEndpoint(!toBool(props.paginate?.search, false))
    @ApiUseBearer(props.paginate?.useBearer)
    @ApiUseApiKey(props.paginate?.useApiKey)
    @UseGuards(...toArray(props.paginate?.guards))
    @UseInterceptors(...toArray(props.paginate?.hooks))
    @UsePipes(...toArray(props.paginate?.pipes))
    @UseFilters(...toArray(props.paginate?.filters))
    @applyDecorators(...toArray(props.paginate?.decorators))
    @HttpCode(HttpStatus.OK)
    async search(@Body() query: QueryDto): Promise<PaginationDto> {
      return this.service.paginate(query);
    }

    @Get('/:id')
    @ApiParam({ name: 'id' })
    @ApiOperation({ summary: `Get ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiExcludeEndpoint(isHideEndpoint(props.detail))
    @ApiNotAllowedEndpoint(toBool(props.detail?.disable, false))
    @ApiUseBearer(props.detail?.useBearer)
    @ApiUseApiKey(props.detail?.useApiKey)
    @UsePipes(...toArray(props.detail?.pipes))
    @UseInterceptors(...toArray(props.detail?.hooks))
    @applyDecorators(...toArray(props.detail?.decorators))
    async detail(@Param('id') id: ID, @Query() query: QueryDto): Promise<T> {
      const detail = await this.service.findById(id, query);
      if (!detail) throw new NotFoundException();
      return detail;
    }

    @Post('/')
    @ApiOperation({ summary: `Create ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiBody({ type: CreateDto })
    @ApiExcludeEndpoint(isHideEndpoint(props.create))
    @ApiNotAllowedEndpoint(toBool(props.create?.disable, false))
    @ApiUseBearer(props.create?.useBearer)
    @ApiUseApiKey(props.create?.useApiKey)
    @UsePipes(new BaseValidationPipe(), ...toArray(props.create?.pipes))
    @UseInterceptors(...toArray(props.create?.hooks))
    @applyDecorators(...toArray(props.create?.decorators))
    async create(@Body() entity: CreateDto): Promise<T> {
      return this.service.create(entity);
    }

    @Put('/:id')
    @ApiOperation({ summary: `Update ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiBody({ type: UpdateDto })
    @ApiExcludeEndpoint(isHideEndpoint(props.update))
    @ApiNotAllowedEndpoint(toBool(props.update?.disable, false))
    @ApiUseBearer(props.update?.useBearer)
    @ApiUseApiKey(props.update?.useApiKey)
    @UsePipes(new BaseValidationPipe({ skipMissingProperties: true }), ...toArray(props.update?.pipes))
    @UseInterceptors(...toArray(props.update?.hooks))
    @applyDecorators(...toArray(props.update?.decorators))
    async update(@Param('id') id: ID, @Body() entity: UpdateDto): Promise<T> {
      const detail = await this.service.update(id, entity);
      if (!detail) throw new NotFoundException();
      return detail;
    }

    @Delete('/:id')
    @ApiOperation({ summary: `Delete ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiExcludeEndpoint(isHideEndpoint(props.delete))
    @ApiNotAllowedEndpoint(toBool(props.delete?.disable, false))
    @ApiUseBearer(props.delete?.useBearer)
    @ApiUseApiKey(props.delete?.useApiKey)
    @UsePipes(...toArray(props.delete?.pipes))
    @UseInterceptors(...toArray(props.delete?.hooks))
    @applyDecorators(...toArray(props.delete?.decorators))
    async delete(@Param('id') id: ID): Promise<T | null> {
      const detail = await this.service.delete(id);
      if (!detail) throw new NotFoundException();
      return null;
    }
  }

  return Controller;
};
