import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';
export class MetahopActivityMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MetahopActivityMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.METAHOPACTIVITY_SERVICE_RABITMQ_URL],
      queue: process.env.METAHOPACTIVITY_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
