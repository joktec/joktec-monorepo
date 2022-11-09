import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { Process, ProcessSchema } from './schemas/process.schema';
import { UtilService } from './services/util/util.service';
import { MysqlService } from './services/mysql/mysql.service';
import { MongodbService } from './services/mongodb/mongodb.service';
import { TableMappingService } from './services/table-mapping/table-mapping.service';
import { TokenMiddleware } from './token.middleware';
import { Topic, TopicSchema } from './schemas/topic.chema';
import { SyncDataLog, SyncDataLogSchema } from './schemas/sync-data-log.chema';
import { KafkaService } from './services/kafka/kafka.service';
import {
  SnapshotFailed,
  SnapshotFailedSchema,
} from './schemas/snapshot-failed.chema';
import { SyncDataService } from './services/sync-data/sync-data.service';
import { Snapshot, SnapshotSchema } from './schemas/snapshot.chema';
import { SnapshotService } from './services/snapshot/snapshot.service';
import { CompareObjectService } from './services/compare-object/compare-object.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Process.name, schema: ProcessSchema },
      { name: Topic.name, schema: TopicSchema },
      { name: Snapshot.name, schema: SnapshotSchema },
      { name: SnapshotFailed.name, schema: SnapshotFailedSchema },
      { name: SyncDataLog.name, schema: SyncDataLogSchema },
    ]),
  ],
  controllers: [ProcessController],
  providers: [
    ProcessService,
    UtilService,
    SyncDataService,
    MysqlService,
    MongodbService,
    TableMappingService,
    KafkaService,
    SnapshotService,
    CompareObjectService,
  ],
})
export class ProcessModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes(ProcessController);
  }
}
