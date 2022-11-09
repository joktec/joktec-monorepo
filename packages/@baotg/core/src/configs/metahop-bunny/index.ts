import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';
export class MetahopBunnyMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MetahopBunnyMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.METAHOPBUNNY_SERVICE_RABITMQ_URL],
      queue: process.env.METAHOPBUNNY_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
