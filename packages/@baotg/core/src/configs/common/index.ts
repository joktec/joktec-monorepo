import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class CommonMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.CommonMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.COMMON_SERVICE_RABITMQ_URL],
      queue: process.env.COMMON_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
