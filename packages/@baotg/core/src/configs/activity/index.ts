import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';
export class ActivityMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.ActivityMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.ACTIVITY_SERVICE_RABITMQ_URL],
      queue: process.env.ACTIVITY_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
