import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class SharedMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.SharedMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.SHARED_RABITMQ_URL],
      queue: process.env.SHARED_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
