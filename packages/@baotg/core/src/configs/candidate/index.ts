import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class CandidateMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.CandidateMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.CANDIDATE_SERVICE_RABITMQ_URL],
      queue: process.env.CANDIDATE_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
