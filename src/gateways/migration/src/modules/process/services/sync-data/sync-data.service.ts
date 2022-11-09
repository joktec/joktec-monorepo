import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EachMessagePayload, KafkaMessage } from 'kafkajs';
import { Collection, Db } from 'mongodb';
import { Model } from 'mongoose';
import { Status } from '../../enums/status.enum';
import {
  DebeziumEvent,
  DebeziumPayload,
  SyncStatus,
} from '../../interfaces/debezium-event.interface';
import { TableMapping } from '../../interfaces/table-mapping.interface';
import { Process, ProcessDocument } from '../../schemas/process.schema';
import {
  SyncDataLog,
  SyncDataLogDocument,
} from '../../schemas/sync-data-log.chema';
import { Topic, TopicDocument } from '../../schemas/topic.chema';
import { KafkaService } from '../kafka/kafka.service';
import { MongodbService } from '../mongodb/mongodb.service';
import { MysqlService } from '../mysql/mysql.service';
import { TableMappingService } from '../table-mapping/table-mapping.service';
import { UtilService } from '../util/util.service';

@Injectable()
export class SyncDataService implements OnModuleInit {
  private readonly logger = new Logger(SyncDataService.name);

  private isStartSyncFromFromMysqlToMongo = false;
  private processExisted: Set<number> = new Set();
  private processRunning: Set<number> = new Set();

  private totalLagMs = 0;
  private totalSyncRecordInOneMin = 0;
  private totalSyncRecordInFiveMin = 0;

  constructor(
    private utilService: UtilService,
    private tableMappingService: TableMappingService,
    private mysqlService: MysqlService,
    private mongodbService: MongodbService,
    private kafkaService: KafkaService,
    @InjectModel(Process.name)
    private processModel: Model<ProcessDocument>,
    @InjectModel(SyncDataLog.name)
    private syncDataLogModel: Model<SyncDataLogDocument>,
    @InjectModel(Topic.name)
    private topicModel: Model<TopicDocument>,
  ) {}

  onModuleInit() {
    setInterval(() => {
      if (!this.isStartSyncFromFromMysqlToMongo) {
        this.startSyncFromFromMysqlToMongo();
      }
    }, 2000);
    setInterval(() => {
      if (this.totalSyncRecordInOneMin != 0) {
        this.logger.log(
          `Average lag in 1 minute: ${
            // eslint-disable-next-line prettier/prettier
            Math.round(this.totalLagMs / this.totalSyncRecordInOneMin)
          }ms`,
        );
        this.logger.log(
          `Total sync record in 1 minute: ${this.totalSyncRecordInOneMin}`,
        );
      }
      this.totalSyncRecordInFiveMin += this.totalSyncRecordInOneMin;
      this.totalLagMs = 0;
      this.totalSyncRecordInOneMin = 0;
    }, 60 * 1000);
    setInterval(() => {
      this.logger.log(
        `Total sync record in 5 minute: ${this.totalSyncRecordInFiveMin}`,
      );
      this.totalSyncRecordInFiveMin = 0;
    }, 5 * 60 * 1000);
  }

  callStartSyncFromFromMysqlToMongo() {
    this.isStartSyncFromFromMysqlToMongo = false;
  }

  async startSyncFromFromMysqlToMongo() {
    this.logger.log('Start syncFromFromMysqlToMongo.');
    const processes: Array<Process> = await this.processModel.find();

    if (processes) {
      for (const process of processes) {
        if (!this.processExisted.has(process.processId)) {
          setInterval(() => {
            if (!this.processRunning.has(process.processId)) {
              this.startSyncFromFromMysqlToMongoByProcessId(process.processId);
            }
          }, 2000);
          this.processExisted.add(process.processId);
        }
      }
    }

    this.isStartSyncFromFromMysqlToMongo = true;
  }

  async startSyncFromFromMysqlToMongoByProcessId(processId: number) {
    this.logger.log(
      `Start syncFromFromMysqlToMongo with process ID = ${processId}`,
    );

    const process: Process = await this.processModel.findOne({
      processId: processId,
    });

    if (!process || !process.isAllowSync) {
      this.logger.log(
        `syncFromFromMysqlToMongo is pause with process ID = ${processId}`,
      );
      this.processRunning.delete(process.processId);
      return;
    }

    this.processRunning.add(process.processId);
    const topics: Array<Topic> = await this.topicModel.find({
      processId: process.processId,
    });

    try {
      await this.kafkaService.comsume(
        processId,
        topics,
        async (eachMessagePayload: EachMessagePayload) => {
          await this.callbackSyncFromFromMysqlToMongo(
            eachMessagePayload.message,
            process.processId,
            eachMessagePayload.topic,
          );
        },
      );
    } catch (error) {
      this.logger.error(`kafkaService comsume message: ${error.message}`);
      this.processRunning.delete(process.processId);
    }
  }

  private async callbackSyncFromFromMysqlToMongo(
    message: KafkaMessage,
    processId: number,
    topicName: string,
  ) {
    if (message && message.value) {
      this.logger.log(`@message: ${message.value.toString()}`);
      let updateOffset = true;
      const offset = message.offset;
      const debeziumEvent: DebeziumEvent = JSON.parse(message.value.toString());
      const process: Process = await this.processModel.findOne({
        processId: processId,
      });
      try {
        if (!process || !process.isAllowSync) {
          updateOffset = false;
          this.processRunning.delete(process.processId);
          this.kafkaService.stopConsume(processId);
          return;
        }

        await this.syncFromMysqlToMongo(debeziumEvent);
      } catch (error) {
        // save to failed log
        this.logger.error(error.message);
        const syncDataLog = new SyncDataLog();
        syncDataLog.processId = processId;
        syncDataLog.offset = offset;
        syncDataLog.data = JSON.stringify(debeziumEvent);
        syncDataLog.status = Status.FAILED;

        await this.syncDataLogModel.create(syncDataLog);
        this.processRunning.delete(process.processId);
      } finally {
        if (updateOffset) {
          // update current offset
          let topic: Topic = await this.topicModel.findOne({
            processId: processId,
            name: topicName,
          });

          if (!topic) {
            topic = {
              processId: processId,
              name: topicName,
            };
            topic.offset = offset;
            await this.topicModel.create(topic);
          } else {
            topic.offset = offset;
            await this.topicModel.replaceOne({ _id: topic['_id'] }, topic);
          }
        }
      }
    }
  }

  private async syncFromMysqlToMongo(debeziumEvent: DebeziumEvent) {
    const payload: DebeziumPayload = debeziumEvent.payload;
    const tableName = payload.source.table;

    const tableMapping: TableMapping =
      this.tableMappingService.getTableMappingForMysql(tableName);

    if (tableMapping == undefined || tableMapping == null) {
      this.logger.log(`Unknow data with data_type is , ${tableName}`);
      return;
    }

    const mongoClient = await this.mongodbService.getMongoClient(
      tableMapping.mongoDatabase,
    );
    const attributeColumns = await this.mysqlService.getOrCreateTableColumn(
      tableMapping.mysqlTable,
    );

    const db: Db = mongoClient.db(tableMapping.mongoDatabase);
    const collection: Collection = db.collection(tableMapping.mongoCollection);

    // eventType = SyncEventType.DELETE
    // else eventType = SyncEventType.INSERT or UPDATE
    if (!payload.after) {
      await collection.deleteMany({
        sqlId: `${payload.before[tableMapping.mysqlId]}`,
      });
    } else {
      const mysqlData = payload.after;
      const mongoData = this.utilService.fromMysqlToMongo(
        mysqlData,
        tableMapping,
        attributeColumns,
        true,
      );
      const syncStatus: SyncStatus =
        await this.mongodbService.insertOrUpdateIfNewer(
          collection,
          mongoData,
          debeziumEvent.payload.source,
        );

      if (syncStatus.status == Status.SUCCESS) {
        this.totalLagMs += syncStatus.lagMs;
        this.totalSyncRecordInOneMin++;
      }
    }
  }
}
