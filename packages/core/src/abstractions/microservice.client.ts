import { Constructor, IBaseRequest, ICondition, IListResponseDto } from '../models';
import { startCase } from 'lodash';
import { cloneInstance, toSingular } from '../utils';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from '../guards';
import { firstValueFrom } from 'rxjs';

export interface IMicroserviceClientProps<T> {
  dto: Constructor<T>;
  dtoName?: string;
}

export const MicroserviceClient = <T extends Record<string, any>, ID>(props?: IMicroserviceClientProps<T>): any => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));

  abstract class Service {
    protected constructor(protected client: ClientProxy) {}

    async findAll(req: IBaseRequest<T>, payload?: JwtPayload): Promise<IListResponseDto<T>> {
      const result = this.client.send<IListResponseDto<T>>(
        { cmd: `${nameSingular}.findAll` },
        { req, jwtPayload: payload },
      );
      return await firstValueFrom(result);
    }

    async find(req: IBaseRequest<T>, payload?: JwtPayload): Promise<T[]> {
      const result = this.client.send<T[]>({ cmd: `${nameSingular}.find` }, { req, jwtPayload: payload });
      return await firstValueFrom(result);
    }

    async create(entity: Partial<T>, payload?: JwtPayload): Promise<T> {
      const processEntity: Partial<T> = cloneInstance(entity);
      if (payload) {
        Object.assign(processEntity, { createdBy: payload.userId, updatedBy: payload.userId });
      }
      const result = this.client.send<T>(
        { cmd: `${nameSingular}.create` },
        { entity: processEntity, jwtPayload: payload },
      );
      return await firstValueFrom(result);
    }

    async update(id: ID, entity: Partial<T>, payload?: JwtPayload): Promise<T> {
      const condition: ICondition<T> = { id };
      const processEntity: Partial<T> = cloneInstance(entity);
      if (payload) {
        Object.assign(processEntity, { updatedBy: payload.userId });
      }
      const result = this.client.send<T>(
        { cmd: `${nameSingular}.update` },
        { condition, entity: processEntity, jwtPayload: payload },
      );
      return await firstValueFrom(result);
    }

    async delete(id: ID, payload?: JwtPayload): Promise<T> {
      const condition: ICondition<T> = { id };
      const result = this.client.send<T>({ cmd: `${nameSingular}.delete` }, { condition, jwtPayload: payload });
      return await firstValueFrom(result);
    }
  }

  return Service;
};
