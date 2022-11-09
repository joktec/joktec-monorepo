import { ClientProxy } from '@nestjs/microservices';
import DataLoader from 'dataloader';
import { firstValueFrom } from 'rxjs';

export class BaseDataLoader {
  constructor(private readonly baseMicroservice: ClientProxy, private message: any) {}

  getLoader(): DataLoader<string, any> {
    return new DataLoader<string, any>(
      async (ids: readonly string[]) =>
        await firstValueFrom(
          this.baseMicroservice.send(this.message.BATCH_GET_IDS, {
            ids,
          }),
        ),
    );
  }
}
