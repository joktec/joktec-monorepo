import { ClientProxy } from '@nestjs/microservices';
import DataLoader from 'dataloader';
import { firstValueFrom } from 'rxjs';
import { Entity } from '../models';

class OverrideDataLoader<T extends Entity, ID = string> extends DataLoader<ID, T> {
  async load(id: ID): Promise<T> {
    return id ? super.load(id) : null;
  }
}

export abstract class BaseDataLoader<T extends Entity, ID = string> {
  protected constructor(
    private readonly baseMicroservice: ClientProxy,
    private message: any,
  ) {}

  getLoader(): DataLoader<ID, T> {
    return new OverrideDataLoader<T, ID>(async (ids: readonly ID[]): Promise<T[]> => {
      const data: T[] = await firstValueFrom(this.baseMicroservice.send(this.message.BATCH_GET_IDS, { ids }));
      const diff = ids.length - data?.length;
      for (let i = 0; i < diff; i++) {
        data.push(null);
      }
      return data;
    });
  }
}
