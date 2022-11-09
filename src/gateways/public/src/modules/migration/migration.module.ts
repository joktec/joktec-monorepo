import {
  MigrationMysqlSnapshotMicroserviceConfig,
  MigrationMysqlBinlogMicroserviceConfig,
  MigrationMongoMicroserviceConfig,
} from '@jobhopin/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { MigrationController } from './migration.controller';
import { TokenMiddleware } from './token.middleware';

const snapshotMicroserviceConfig =
  new MigrationMysqlSnapshotMicroserviceConfig();

const binlogMicroserviceConfig = new MigrationMysqlBinlogMicroserviceConfig();

const mongoMicroserviceConfig = new MigrationMongoMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: snapshotMicroserviceConfig.name,
        ...snapshotMicroserviceConfig.microserviceOptions,
      },
      {
        name: binlogMicroserviceConfig.name,
        ...binlogMicroserviceConfig.microserviceOptions,
      },
      {
        name: mongoMicroserviceConfig.name,
        ...mongoMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [],
  controllers: [MigrationController],
  exports: [],
})

export class MigrationModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    
    consumer
      .apply(TokenMiddleware)
      .forRoutes(MigrationController);
  }

}
