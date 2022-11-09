import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class JobseekerMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.JobseekerMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.JOBSEEKER_SERVICE_RABITMQ_URL],
      queue: process.env.JOBSEEKER_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
