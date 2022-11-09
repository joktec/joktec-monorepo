import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class JobMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.JobMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.JOB_SERVICE_RABITMQ_URL],
      queue: process.env.JOB_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
