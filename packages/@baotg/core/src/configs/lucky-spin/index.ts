import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class LuckySpinMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.LuckySpinMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.LUCKY_SPIN_SERVICE_RABITMQ_URL],
      queue: process.env.LUCKY_SPIN_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
