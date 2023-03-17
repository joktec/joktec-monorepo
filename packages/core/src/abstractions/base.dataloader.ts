import { ClientProxy } from '@nestjs/microservices';
import DataLoader from 'dataloader';
import { firstValueFrom } from 'rxjs';

class OverrideDataLoader<ID, T> extends DataLoader<ID, T> {
  async load(id: ID) {
    return id ? super.load(id) : null;
  }
}

export abstract class BaseDataLoader<T, ID> {
  protected constructor(private readonly baseMicroservice: ClientProxy, private message: any) {}

  getLoader(): DataLoader<ID, T> {
    return new OverrideDataLoader<ID, T>(async (ids: readonly ID[]) => {
      const data: T[] = await firstValueFrom(this.baseMicroservice.send(this.message.BATCH_GET_IDS, { ids }));
      const diff = ids.length - data?.length;
      for (let i = 0; i < diff; i++) {
        data.push(null);
      }
      return data;
    });
  }
}
