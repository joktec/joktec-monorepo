import {
  Body,
  CanActivate,
  Delete,
  Get,
  Inject,
  NestInterceptor,
  OnModuleInit,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
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
import { isArray, startCase } from 'lodash';
import { ConfigService } from '../config';
import { ExceptionMessage, MethodNotAllowedException, ServiceUnavailableException } from '../exceptions';
import { Jwt, JwtPayload } from '../guards';
import { GatewayMetric } from '../infras';
import { QueryInterceptor } from '../interceptors';
import { LogService } from '../logger';
import { BaseListResponse, Constructor, Entity, IBaseRequest } from '../models';
import { ApiSchema } from '../swagger';
import { includes, someIncludes, toArray, toBool, toPlural, toSingular } from '../utils';
import { BaseValidationPipe } from '../validation';
import { BaseService } from './base.service';

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

export interface IControllerProps<T extends Entity> {
  dto: Constructor<T>;
  dtoName?: string;
  customDto?: {
    createDto?: Constructor<T | any>;
    updatedDto?: Constructor<T | any>;
  };
  apiTag?: string;
  excludes?: ControllerExclude[];
  useBearer?: boolean | ControllerMethod[];
  hooks?: { [key in ControllerMethod]?: (NestInterceptor | Function)[] };
  guards?: { [key in ControllerMethod]?: (CanActivate | Function)[] };
  metadata?: { [key in ControllerMethod]?: { key: string; value: any }[] };
  metric?: boolean;
}

export const BaseController = <T extends Entity, ID>(props: IControllerProps<T>): any => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const namePlural = toPlural(nameSingular);
  const apiTag = props.apiTag || toPlural(dtoName);
  const excludes = toArray<ControllerExclude>(props.excludes);

  const createDto: Constructor<T | any> = props.customDto?.createDto || props.dto;
  const updatedDto: Constructor<T | any> = props.customDto?.updatedDto || createDto;

  @ApiSchema({ name: `${nameSingular}Pagination` })
  class PaginationDto extends BaseListResponse<T>(props.dto) {}

  @ApiTags(apiTag.toLowerCase())
  @ApiExcludeController(includes(excludes, ControllerExclude.ALL))
  abstract class Controller implements OnModuleInit {
    @Inject() protected configService: ConfigService;
    @Inject() protected logService: LogService;

    protected constructor(protected service: BaseService<T, ID>) {}

    onModuleInit() {
      this.logService.setContext(this.constructor.name);
    }

    protected checkMethod(...methodExcludes: ControllerExclude[]) {
      if (excludes.includes(ControllerExclude.ALL))
        throw new ServiceUnavailableException(ExceptionMessage.UNDERGOING_MAINTENANCE);
      if (someIncludes(excludes, ...methodExcludes)) throw new MethodNotAllowedException();
    }

    @Get('/')
    @ApiOperation({ summary: `List ${namePlural}` })
    @ApiOkResponse({ type: PaginationDto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.READ, ControllerExclude.LIST))
    @UseGuards(...toArray(props?.guards?.findAll))
    @UseInterceptors(QueryInterceptor, ...toArray(props?.hooks?.findAll))
    async findAll(@Query() query: IBaseRequest<T>): Promise<PaginationDto> {
      this.checkMethod(ControllerExclude.READ, ControllerExclude.LIST);
      return this.service.findAll(query);
    }

    @Get('/:id')
    @ApiOperation({ summary: `Get ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.READ, ControllerExclude.GET))
    @ApiParam({ name: 'id' })
    @UseGuards(...toArray(props?.guards?.findOne))
    @UseInterceptors(QueryInterceptor, ...toArray(props?.hooks?.findOne))
    async findOne(@Param('id') id: ID, @Query() query: IBaseRequest<T>): Promise<T> {
      this.checkMethod(ControllerExclude.READ, ControllerExclude.GET);
      return this.service.findById(id, query);
    }

    @Post('/')
    @ApiOperation({ summary: `Create ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiBody({ type: createDto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.CREATE))
    @UseGuards(...toArray(props?.guards?.create))
    @UsePipes(new BaseValidationPipe())
    @UseInterceptors(...toArray(props?.hooks?.create))
    async create(@Body() entity: Partial<T>, @Jwt() payload?: JwtPayload): Promise<T> {
      this.checkMethod(ControllerExclude.WRITE, ControllerExclude.CREATE);
      return this.service.create(entity, payload);
    }

    @Put('/:id')
    @ApiOperation({ summary: `Update ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiBody({ type: updatedDto })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.UPDATE))
    @UseGuards(...toArray(props?.guards?.update))
    @UsePipes(new BaseValidationPipe({ skipMissingProperties: true }))
    @UseInterceptors(...toArray(props?.hooks?.update))
    async update(@Param('id') id: ID, @Body() entity: Partial<T>, @Jwt() payload?: JwtPayload): Promise<T> {
      this.checkMethod(ControllerExclude.WRITE, ControllerExclude.UPDATE);
      return this.service.update(id, entity, payload);
    }

    @Delete('/:id')
    @ApiOperation({ summary: `Delete ${nameSingular}` })
    @ApiOkResponse({ type: props.dto })
    @ApiParam({ name: 'id' })
    @ApiExcludeEndpoint(someIncludes(excludes, ControllerExclude.WRITE, ControllerExclude.DELETE))
    @UseGuards(...toArray(props?.guards?.delete))
    @UseInterceptors(...toArray(props?.hooks?.delete))
    async delete(@Param('id') id: ID, @Jwt() payload?: JwtPayload): Promise<T> {
      this.checkMethod(ControllerExclude.WRITE, ControllerExclude.DELETE);
      return this.service.delete(id, payload);
    }
  }

  if (isArray(props?.useBearer)) {
    props.useBearer.map(method => {
      const descriptor = Object.getOwnPropertyDescriptor(Controller.prototype, method);
      ApiBearerAuth()(Controller.prototype, method, descriptor);
    });
  } else {
    const useBearer = toBool(props?.useBearer, true);
    if (useBearer) ApiBearerAuth()(Controller);
  }

  const metric = toBool(props?.metric, true);
  if (metric) {
    UseInterceptors(GatewayMetric)(Controller);
  }

  Object.keys(props?.metadata || {}).map(method => {
    const metaArr: { key: string; value: any }[] = toArray(props.metadata[method]);
    const descriptor = Object.getOwnPropertyDescriptor(Controller.prototype, method);
    metaArr.map(({ key, value }) => SetMetadata(key, value)(Controller.prototype, method, descriptor));
  });

  return Controller;
};
