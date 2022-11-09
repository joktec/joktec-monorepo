import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';
export class MetahopQuizzMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MetahopQuizzMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.METAHOPQUIZZ_SERVICE_RABITMQ_URL],
      queue: process.env.METAHOPQUIZZ_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
