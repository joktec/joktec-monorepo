import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { startCase } from 'lodash';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '../config';
import { JwtPayload } from '../guards';
import { LogService } from '../log';
import { Constructor, DeepPartial, IBaseRequest, ICondition, IListResponseDto } from '../models';
import { cloneInstance, toSingular } from '../utils';

export interface IMicroserviceClientProps<T> {
  dto: Constructor<T>;
  dtoName?: string;
}

export const MicroserviceClient = <T extends object, ID>(props?: IMicroserviceClientProps<T>): any => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));

  abstract class Service implements OnModuleInit {
    @Inject() protected configService: ConfigService;
    @Inject() protected logService: LogService;

    protected constructor(protected client: ClientProxy) {}

    onModuleInit() {
      this.logService.setContext(this.constructor.name);
    }

    async findAll(req: IBaseRequest<T>, jwtPayload?: JwtPayload): Promise<IListResponseDto<T>> {
      const result = this.client.send<IListResponseDto<T>>({ cmd: `${nameSingular}.findAll` }, { req, jwtPayload });
      return await firstValueFrom(result);
    }

    async find(req: IBaseRequest<T>, jwtPayload?: JwtPayload): Promise<T[]> {
      const result = this.client.send<T[]>({ cmd: `${nameSingular}.find` }, { req, jwtPayload });
      return await firstValueFrom(result);
    }

    async findOne(id: ID, req: IBaseRequest<T> = {}, jwtPayload?: JwtPayload): Promise<T> {
      const result = this.client.send<T>({ cmd: `${nameSingular}.findOne` }, { id, req, jwtPayload });
      return await firstValueFrom(result);
    }

    async create(entity: DeepPartial<T>, jwtPayload?: JwtPayload): Promise<T> {
      const processEntity: DeepPartial<T> = cloneInstance(entity);
      if (jwtPayload) {
        Object.assign(processEntity, { createdBy: jwtPayload.userId, updatedBy: jwtPayload.userId });
      }
      const result = this.client.send<T>({ cmd: `${nameSingular}.create` }, { entity: processEntity, jwtPayload });
      return await firstValueFrom(result);
    }

    async update(id: ID, entity: DeepPartial<T>, jwtPayload?: JwtPayload): Promise<T> {
      const condition: ICondition<T> = { id } as object;
      const processEntity: DeepPartial<T> = cloneInstance(entity);
      if (jwtPayload) {
        Object.assign(processEntity, { updatedBy: jwtPayload.userId });
      }
      const result = this.client.send<T>(
        { cmd: `${nameSingular}.update` },
        { condition, entity: processEntity, jwtPayload },
      );
      return await firstValueFrom(result);
    }

    async delete(id: ID, jwtPayload?: JwtPayload): Promise<T> {
      const condition: ICondition<T> = { id } as object;
      const result = this.client.send<T>({ cmd: `${nameSingular}.delete` }, { condition, jwtPayload });
      return await firstValueFrom(result);
    }
  }

  return Service;
};
