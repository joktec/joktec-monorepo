import { Inject, OnModuleInit, Type } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { startCase } from 'lodash';
import { firstValueFrom } from 'rxjs';
import { MethodNotAllowedException } from '../exceptions';
import { Constructor, DeepPartial, Entity, IBaseRequest, IBaseService, IListResponseDto } from '../models';
import { ConfigService, JwtPayload, LogService } from '../modules';
import { toSingular } from '../utils';

export interface IMicroClientProps<T extends Entity> {
  dto: Constructor<T>;
  dtoName?: string;
}

export const ClientService = <T extends Entity, ID = string, REQ extends IBaseRequest<T> = IBaseRequest<T>>(
  props?: IMicroClientProps<T>,
): Type<IBaseService<T, ID, REQ>> => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));

  class Service implements IBaseService<T, ID, REQ>, OnModuleInit {
    @Inject() public readonly configService: ConfigService;
    @Inject() public readonly logService: LogService;

    constructor(protected client: ClientProxy) {}

    onModuleInit() {
      this.logService.setContext(this.constructor.name);
      this.afterModuleInit();
    }

    protected afterModuleInit() {}

    async paginate(req: REQ): Promise<IListResponseDto<T>> {
      const result = this.client.send<IListResponseDto<T>>({ cmd: `${nameSingular}.paginate` }, { req });
      return await firstValueFrom(result);
    }

    async find(req: IBaseRequest<T>): Promise<T[]> {
      const result = this.client.send<IListResponseDto<T>>({ cmd: `${nameSingular}.paginate` }, { req });
      const data = await firstValueFrom(result);
      return data?.items || [];
    }

    async findOne(req: IBaseRequest<T> = {}): Promise<T> {
      const id = req?.condition?.['id'] || req?.condition?.['_id'];
      const result = this.client.send<T>({ cmd: `${nameSingular}.detail` }, { id, req });
      return await firstValueFrom(result);
    }

    async create(entity: DeepPartial<T>, jwtPayload?: JwtPayload): Promise<T> {
      const result = this.client.send<T>({ cmd: `${nameSingular}.create` }, { entity, jwtPayload });
      return await firstValueFrom(result);
    }

    async update(id: ID, entity: DeepPartial<T>, jwtPayload?: JwtPayload): Promise<T> {
      const result = this.client.send<T>({ cmd: `${nameSingular}.update` }, { id, entity, jwtPayload });
      return await firstValueFrom(result);
    }

    async delete(id: ID, jwtPayload?: JwtPayload): Promise<T> {
      const result = this.client.send<T>({ cmd: `${nameSingular}.delete` }, { id, jwtPayload });
      return await firstValueFrom(result);
    }

    async restore(id: ID, payload?: JwtPayload): Promise<T> {
      throw new MethodNotAllowedException('Method not implemented.');
    }
  }

  return Service;
};
