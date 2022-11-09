import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class AuthMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.AuthMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.AUTH_SERVICE_RABITMQ_URL],
      queue: process.env.AUTH_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
