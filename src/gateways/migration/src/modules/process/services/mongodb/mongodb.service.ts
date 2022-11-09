import { Injectable, Logger } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';
import { Status } from '../../enums/status.enum';
import {
  DebeziumPayloadSource,
  SyncStatus,
} from '../../interfaces/debezium-event.interface';
import { UtilService } from '../util/util.service';

@Injectable()
export class MongodbService {
  private logger = new Logger(MongodbService.name);

  private mongoClients: Map<string, MongoClient> = new Map();

  constructor(private utilService: UtilService) {
    this.mongoClients.set(
      process.env.MONGODB_DATABASE_ACTIVITY,
      MongoClient.connect(process.env.MONGODB_URL_ACTIVITY) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_BLOG,
      MongoClient.connect(process.env.MONGODB_URL_BLOG) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_CHAT,
      MongoClient.connect(process.env.MONGODB_URL_CHAT) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_COMMON,
      MongoClient.connect(process.env.MONGODB_URL_COMMON) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_CANDIDATE,
      MongoClient.connect(process.env.MONGODB_URL_CANDIDATE) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_CV,
      MongoClient.connect(process.env.MONGODB_URL_CV) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_JOB,
      MongoClient.connect(process.env.MONGODB_URL_JOB) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_JOBSEEKER,
      MongoClient.connect(process.env.MONGODB_URL_JOBSEEKER) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_QUIZZ,
      MongoClient.connect(process.env.MONGODB_URL_QUIZZ) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_LUCKY_SPIN,
      MongoClient.connect(process.env.MONGODB_URL_LUCKY_SPIN) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_ORGANIZATION,
      MongoClient.connect(process.env.MONGODB_URL_ORGANIZATION) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_USERS,
      MongoClient.connect(process.env.MONGODB_URL_USERS) as any,
    );

    this.mongoClients.set(
      process.env.MONGODB_DATABASE_OTHER,
      MongoClient.connect(process.env.MONGODB_URL_OTHER) as any,
    );
  }

  // remove connect each sync data
  // create too many connection
  // You open do MongoClient.connect once when your app boots up and reuse the db object.
  // It's not a singleton connection pool each .connect creates a new connection pool.
  async getMongoClient(mongoDatabase: string) {
    const mongoClient: MongoClient = this.mongoClients.get(
      mongoDatabase,
    ) as any;
    return mongoClient;
  }

  async insertOrUpdateIfNewer(
    collection: Collection,
    mongoData,
    debeziumPayloadSource: DebeziumPayloadSource,
  ): Promise<SyncStatus> {
    let status = Status.SUCCESS;

    const id = { _id: mongoData[this.utilService.MONGO_ID_FILED] };
    const existData = await collection.findOne(id);
    if (existData) {
      // update if is newer data
      let currentTime = new Date(
        mongoData[this.utilService.UPDATED_AT_FIELD],
      ).getTime();
      if (isNaN(currentTime)) {
        if (debeziumPayloadSource) {
          currentTime = debeziumPayloadSource.ts_ms;
          mongoData[this.utilService.UPDATED_AT_FIELD] = new Date(currentTime);
        } else {
          this.logger.log(
            'Snapshot process: Data do not have field updated_date, skip.',
          );
          return {
            status: Status.SKIP,
            lagMs: 0,
          };
        }
      }
      const existTime = new Date(
        existData[this.utilService.UPDATED_AT_FIELD],
      ).getTime();
      if (currentTime > existTime) {
        delete mongoData['_id'];
        mongoData[this.utilService.CREATED_AT_FIELD] = existData[
          this.utilService.CREATED_AT_FIELD
        ]
          ? existData[this.utilService.CREATED_AT_FIELD]
          : new Date();
        await collection.replaceOne(id, mongoData);
      } else {
        this.logger.log('Old data, skip.');
        status = Status.SKIP;
      }
    } else {
      // insert
      await collection.insertOne(mongoData);
    }

    return {
      status: status,
      lagMs: debeziumPayloadSource
        ? new Date().getTime() - debeziumPayloadSource.ts_ms
        : 0,
    };
  }
}
