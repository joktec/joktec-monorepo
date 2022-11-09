import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';
export class QuizzMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.QuizzMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.QUIZZ_SERVICE_RABITMQ_URL],
      queue: process.env.QUIZZ_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
