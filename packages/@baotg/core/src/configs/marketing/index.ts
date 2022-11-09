import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class MarketingMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MarketingMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.MARKETING_SERVICE_RABITMQ_URL],
      queue: process.env.MARKETING_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
