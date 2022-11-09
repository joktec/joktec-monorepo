import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class OrganizationMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.OrganizationMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.ORGANIZATION_SERVICE_RABITMQ_URL],
      queue: process.env.ORGANIZATION_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
