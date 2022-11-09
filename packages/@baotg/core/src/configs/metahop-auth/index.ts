import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';
export class MetahopAuthMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MetahopAuthMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.METAHOPAUTH_SERVICE_RABITMQ_URL],
      queue: process.env.METAHOPAUTH_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
