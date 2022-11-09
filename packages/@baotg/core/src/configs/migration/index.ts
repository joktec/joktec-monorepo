import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';
export class MigrationMongoMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MigrationMongoMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.MIGRATION_SERVICE_RABITMQ_URL],
      queue: process.env.MIGRATION_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}

export class MigrationMysqlSnapshotMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MigrationMysqlSnapshot';
  public microserviceOptions = {
    options: {
      urls: [process.env.MIGRATION_SERVICE_RABITMQ_URL],
      queue: process.env.MIGRATION_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}

export class MigrationMysqlBinlogMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MigrationMysqlBinlog';
  public microserviceOptions = {
    options: {
      urls: [process.env.MIGRATION_SERVICE_RABITMQ_URL],
      queue: process.env.MIGRATION_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
