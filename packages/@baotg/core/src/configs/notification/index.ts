import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class NotificationMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.NotificationMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.NOTIFICATION_SERVICE_RABITMQ_URL],
      queue: process.env.NOTIFICATION_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
