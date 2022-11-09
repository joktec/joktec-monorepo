import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class CvMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.CvMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.CV_SERVICE_RABITMQ_URL],
      queue: process.env.CV_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
