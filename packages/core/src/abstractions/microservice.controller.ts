import { UseInterceptors, UsePipes } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { BaseService } from './base.service';
import { Constructor, IBaseRequest, IListResponseDto } from '../models';
import { JwtPayload } from '../guards';
import { startCase } from 'lodash';
import { toBool, toSingular } from '../utils';
import { BaseValidationPipe } from '../validation';
import { MicroPromInterceptor } from '../infras';

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

  abstract class Controller {
    protected constructor(protected service: BaseService<T, ID>) {}

    @MessagePattern({ cmd: `${nameSingular}.findAll` }, transport)
    async findAll(
      @Payload('req') req: IBaseRequest<T>,
      @Payload('jwt') jwtPayload: JwtPayload,
      @Ctx() context: any,
    ): Promise<IListResponseDto<T>> {
      return this.service.findAll(req, jwtPayload);
    }

    @MessagePattern({ cmd: `${nameSingular}.findOne` }, transport)
    async findOne(
      @Payload('id') id: ID,
      @Payload('req') req: IBaseRequest<T>,
      @Payload('jwt') jwtPayload: JwtPayload,
      @Ctx() context: any,
    ): Promise<T> {
      return this.service.findOne(id, req, jwtPayload);
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
      @Payload('entity') entity: Partial<T>,
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
    UseInterceptors(MicroPromInterceptor)(Controller);
  }

  return Controller;
};
