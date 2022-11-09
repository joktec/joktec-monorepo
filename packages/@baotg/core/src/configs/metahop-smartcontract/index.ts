import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';
export class MetahopSmartContractMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MetahopSmartContractMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.METAHOPSMARTCONTRACT_SERVICE_RABITMQ_URL],
      queue: process.env.METAHOPSMARTCONTRACT_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
