import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class MysqlMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MysqlMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.MYSQL_SERVICE_RABITMQ_URL],
      queue: process.env.MYSQL_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
