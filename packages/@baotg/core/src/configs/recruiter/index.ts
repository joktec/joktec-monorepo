import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class RecruiterMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.RecruiterMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.RECRUITER_SERVICE_RABITMQ_URL],
      queue: process.env.RECRUITER_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
