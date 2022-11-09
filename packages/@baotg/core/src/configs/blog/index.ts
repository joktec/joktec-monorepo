import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class BlogMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.BlogMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.BLOG_SERVICE_RABITMQ_URL],
      queue: process.env.BLOG_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
