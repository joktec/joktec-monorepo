import { Inject, OnModuleInit, Type, UsePipes } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  MqttContext,
  NatsContext,
  Payload,
  RedisContext,
  RmqContext,
  TcpContext,
  Transport,
} from '@nestjs/microservices';
import { set, startCase } from 'lodash';
import { Constructor, DeepPartial, Entity, IBaseController, IBaseRequest, IPaginationResponse } from '../models';
import { ConfigService, LogService } from '../modules';
import { BaseValidationPipe } from '../pipes';
import { toSingular } from '../utils';
import { BaseService } from './base.service';

export type MicroContext = TcpContext | RedisContext | NatsContext | MqttContext | RmqContext | KafkaContext;

export interface IMicroControllerProps<T extends Entity> {
  dto: Constructor<T>;
  dtoName?: string;
  transport?: Transport;
}

export const ClientController = <T extends Entity, ID>(
  props: IMicroControllerProps<T>,
): Type<IBaseController<T, ID>> => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));
  const transport: Transport = props.transport || Transport.TCP;

  class Controller implements IBaseController<T, ID>, OnModuleInit {
    @Inject() public readonly configService: ConfigService;
    @Inject() public readonly logService: LogService;

    constructor(protected service: BaseService<T, ID>) {}

    onModuleInit() {
      this.logService.setContext(this.constructor.name);
      this.afterModuleInit();
    }

    protected afterModuleInit() {}

    @MessagePattern({ cmd: `${nameSingular}.paginate` }, transport)
    async paginate(
      @Payload('req') req: IBaseRequest<T>,
      @Ctx() context?: MicroContext,
    ): Promise<IPaginationResponse<T>> {
      return this.service.paginate(req);
    }

    @MessagePattern({ cmd: `${nameSingular}.detail` }, transport)
    async detail(
      @Payload('id') id: ID,
      @Payload('req') req: IBaseRequest<T>,
      @Ctx() context?: MicroContext,
    ): Promise<T> {
      set(req, 'condition.id', id);
      return this.service.findOne(req);
    }

    @MessagePattern({ cmd: `${nameSingular}.create` }, transport)
    @UsePipes(new BaseValidationPipe())
    async create(@Payload('entity') entity: T, @Ctx() context?: MicroContext): Promise<T> {
      return this.service.create(entity);
    }

    @MessagePattern({ cmd: `${nameSingular}.update` }, transport)
    @UsePipes(new BaseValidationPipe({ skipMissingProperties: true }))
    async update(
      @Payload('id') id: ID,
      @Payload('entity') entity: DeepPartial<T>,
      @Ctx() context?: MicroContext,
    ): Promise<T> {
      return this.service.update(id, entity);
    }

    @MessagePattern({ cmd: `${nameSingular}.delete` }, transport)
    async delete(@Payload('id') id: ID, @Ctx() context?: RmqContext): Promise<T> {
      return this.service.delete(id);
    }
  }

  return Controller;
};
