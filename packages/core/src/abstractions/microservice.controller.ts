import { Inject, OnModuleInit, UseInterceptors, UsePipes } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { startCase } from 'lodash';
import { ConfigService } from '../config';
import { JwtPayload } from '../guards';
import { MicroMetric } from '../infras';
import { LogService } from '../logger';
import { Constructor, DeepPartial, IBaseRequest, IListResponseDto } from '../models';
import { toBool, toSingular } from '../utils';
import { BaseValidationPipe } from '../validation';
import { BaseService } from './base.service';

export interface IMicroserviceControllerProps<T> {
  dto: Constructor<T>;
  dtoName?: string;
  metric?: boolean;
  transport?: Transport;
}

export const MicroserviceController = <T extends object, ID>(props: IMicroserviceControllerProps<T>): any => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const transport: Transport = props.transport || Transport.TCP;

  abstract class Controller implements OnModuleInit {
    @Inject() protected configService: ConfigService;
    @Inject() protected logService: LogService;

    protected constructor(protected service: BaseService<T, ID>) {}

    onModuleInit() {
      this.logService.setContext(this.constructor.name);
    }

    @MessagePattern({ cmd: `${nameSingular}.findAll` }, transport)
    async findAll(@Payload('req') req: IBaseRequest<T>, @Ctx() context: any): Promise<IListResponseDto<T>> {
      return this.service.findAll(req);
    }

    @MessagePattern({ cmd: `${nameSingular}.findOne` }, transport)
    async findOne(@Payload('id') id: ID, @Payload('req') req: IBaseRequest<T>, @Ctx() context: any): Promise<T> {
      return this.service.findById(id, req);
    }

    @MessagePattern({ cmd: `${nameSingular}.create` }, transport)
    @UsePipes(new BaseValidationPipe())
    async create(
      @Payload('entity') entity: T,
      @Payload('jwt') jwtPayload: JwtPayload,
      @Ctx() context: any,
    ): Promise<T> {
      return this.service.create(entity, jwtPayload);
    }

    @MessagePattern({ cmd: `${nameSingular}.update` }, transport)
    @UsePipes(new BaseValidationPipe({ skipMissingProperties: true }))
    async update(
      @Payload('id') id: ID,
      @Payload('entity') entity: DeepPartial<T>,
      @Payload('jwt') jwtPayload: JwtPayload,
      @Ctx() context: any,
    ): Promise<T> {
      return this.service.update(id, entity, jwtPayload);
    }

    @MessagePattern({ cmd: `${nameSingular}.delete` }, transport)
    async delete(@Payload('id') id: ID, @Payload('jwt') jwtPayload: JwtPayload, @Ctx() context: any): Promise<T> {
      return this.service.delete(id, jwtPayload);
    }
  }

  const metric = toBool(props.metric, true);
  if (metric) {
    UseInterceptors(MicroMetric)(Controller);
  }

  return Controller;
};
