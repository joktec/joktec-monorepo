import { ClientController, Controller, IMicroControllerProps, MessagePattern, Payload, Transport } from '@joktec/core';
import { SuccessResponse } from '../../common';
import { CronSchema } from '../../models/schemas';
import { CronService } from './cron.service';

const props: IMicroControllerProps<CronSchema> = {
  dto: CronSchema,
  transport: Transport.REDIS,
};

@Controller('crons')
export class CronController extends ClientController<CronSchema, string>(props) {
  constructor(protected cronService: CronService) {
    super(cronService);
  }

  @MessagePattern({ cmd: `Cron.refresh` }, Transport.REDIS)
  async refresh(): Promise<SuccessResponse> {
    return this.cronService.refresh();
  }

  @MessagePattern({ cmd: `Cron.refreshOne` }, Transport.REDIS)
  async refreshOne(@Payload('cron') cron: CronSchema): Promise<SuccessResponse> {
    return this.cronService.refresh(cron);
  }

  @MessagePattern({ cmd: `Cron.trigger` }, Transport.REDIS)
  async trigger(@Payload('cronId') cronId: string, @Payload('waiting') waiting?: boolean): Promise<SuccessResponse> {
    return this.cronService.trigger(cronId, waiting);
  }
}
