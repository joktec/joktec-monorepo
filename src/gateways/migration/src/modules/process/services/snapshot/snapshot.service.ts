import { Injectable, Logger } from '@nestjs/common';
import { Connection, createConnection } from 'mysql2';

import { UtilService } from '../util/util.service';
import { TableMappingService } from '../table-mapping/table-mapping.service';
import { TableMapping } from '../../interfaces/table-mapping.interface';
import { MongodbService } from '../mongodb/mongodb.service';
import { MysqlService } from '@app/modules/process/services/mysql/mysql.service';
import { Snapshot, SnapshotDocument } from '../../schemas/snapshot.chema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  SnapshotFailed,
  SnapshotFailedDocument,
} from '../../schemas/snapshot-failed.chema';
import { SnapshotCheckResult } from '../../interfaces/snapshot-check-result.interface';
import { Topic, TopicDocument } from '../../schemas/topic.chema';
import { Status } from '../../enums/status.enum';
import { Collection, Db } from 'mongodb';

@Injectable()
export class SnapshotService {
  private logger = new Logger(SnapshotService.name);

  private connection: Connection;

  private SNAPSHOT_INSERT_PAGE_SIZE = 100;

  private DATABASE_SERVER_NAME: string;
  private MYSQL_SCHEMA: string;

  constructor(
    private utilService: UtilService,
    private mongodbService: MongodbService,
    private tableMappingService: TableMappingService,
    private mysqlService: MysqlService,
    @InjectModel(Snapshot.name)
    private snapshotModel: Model<SnapshotDocument>,
    @InjectModel(SnapshotFailed.name)
    private snapshotFailedDocument: Model<SnapshotFailedDocument>,
    @InjectModel(Topic.name)
    private topicModel: Model<TopicDocument>,
  ) {
    const MYSQL_URL_INFO = {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    };
    this.connection = createConnection(MYSQL_URL_INFO);

    if (process.env.SNAPSHOT_INSERT_PAGE_SIZE)
      this.SNAPSHOT_INSERT_PAGE_SIZE = +process.env.SNAPSHOT_INSERT_PAGE_SIZE;

    this.DATABASE_SERVER_NAME = process.env.DATABASE_SERVER_NAME;
    this.MYSQL_SCHEMA = process.env.MYSQL_DATABASE;
  }

  async findById(processId: number, tableName): Promise<Snapshot> {
    return this.snapshotModel.findOne({
      processId: processId,
      tableName: tableName,
    });
  }

  async findAllById(processId: number): Promise<Array<Snapshot>> {
    return this.snapshotModel.find({
      processId: processId,
    });
  }

  async migrateSnapshot(
    processId: number,
    databaseInclude: Array<string>,
    tableInclude: Array<string>,
    databaseExclude: Array<string>,
    tableExclude: Array<string>,
    isRetry: boolean,
  ) {
    this.connection.connect();

    const tableMappings = this.tableMappingService.getAllTableMapping();
    for (const tableMapping of tableMappings) {
      this.logger.log('@MySQL table', tableMapping.mysqlTable);
      if (
        this.isMigrate(
          tableMapping.mongoDatabase,
          tableMapping.mysqlTable,
          databaseInclude,
          tableInclude,
          databaseExclude,
          tableExclude,
        )
      ) {
        await this.migrateSnapshotWithPaging(
          processId,
          tableMapping,
          this.SNAPSHOT_INSERT_PAGE_SIZE,
          isRetry,
        );
      } else {
        this.logger.log(`Table ${tableMapping.mysqlTable} was skipped.`);
      }
    }

    // this.connection.end();
  }

  // only support follow database
  isMigrate(
    database: string,
    tableName: string,
    databaseInclude: Array<string>,
    tableInclude: Array<string>,
    databaseExclude: Array<string>,
    tableExclude: Array<string>,
  ): boolean {
    // check is allow
    // allow is high priority
    if (databaseInclude.length != 0) {
      // list allow db not include this db
      if (!databaseInclude.includes(database)) {
        return false;
      } else {
        return true;
        //   if (tableInclude.length != 0) {
        //     if (!tableInclude.includes(tableName)) {
        //       return false;
        //     }
        //   }
      }
    }

    // check is deny
    if (databaseExclude.length != 0) {
      if (databaseExclude.includes(database)) {
        return false;
        // if (tableExclude.length == 0) {
        //   return false;
        // } else {
        //   if (tableExclude.includes(tableName)) {
        //     return false;
        //   }
        // }
      }
    }

    // when all list is empty
    return true;
  }

  async migrateSnapshotWithPaging(
    processId: number,
    tableMapping: TableMapping,
    pageSize: number,
    isRetry: boolean,
  ) {
    const mysqlTable = tableMapping.mysqlTable;
    const mongoDatabase = tableMapping.mongoDatabase;
    const snapshot: Snapshot = new Snapshot();
    snapshot.processId = processId;
    snapshot.tableName = mysqlTable;
    try {
      const snapshotExist = await this.findById(processId, mysqlTable);
      if (snapshotExist) {
        this.logger.log(`Table ${mysqlTable} have been migrated.`);
        return;
      }

      this.logger.log('Start migrateSnapshotWithPaging', mysqlTable);

      const mongoClient = await this.mongodbService.getMongoClient(
        mongoDatabase,
      );

      const db: Db = mongoClient.db(mongoDatabase);
      const collection: Collection = db.collection(
        tableMapping.mongoCollection,
      );

      const totalExistCount = await collection.countDocuments();
      if (totalExistCount > 0) {
        this.logger.log(
          `The collection ${tableMapping.mongoCollection} exist data.`,
        );
        return;
      }

      const countQuery = `SELECT count(*) as count FROM \`${mysqlTable}\``;

      let totalCount = 0;
      await this.utilService
        .getDataFromMySQL(this.connection, countQuery)
        .then((result) => {
          totalCount = JSON.parse(JSON.stringify(result))[0]['count'];
        });

      snapshot.totalMigrated = totalCount;
      snapshot.status = Status.SUCCESS;

      this.logger.log('totalCount: ', totalCount);

      let start = 0;
      while (totalCount > start) {
        this.logger.log(`Migrate snapshot for ${mysqlTable} start at ${start}`);
        // only using for test, only migrate 999 records
        // if (start > 999) break;
        let mongoData;
        try {
          const selectQuery = `SELECT * FROM \`${mysqlTable}\` LIMIT ${start}, ${pageSize}`;
          const attributeColumns =
            await this.mysqlService.getOrCreateTableColumn(mysqlTable);

          await this.utilService
            .getDataFromMySQL(this.connection, selectQuery)
            .then((results) => {
              // JSON.parse(JSON.stringify()) to parse all data to JSON
              // MySQL only convert Json first level
              const mysqlData = JSON.parse(JSON.stringify(results));
              mongoData = this.utilService.fromMysqlListToMongoList(
                mysqlData,
                tableMapping,
                attributeColumns,
              );
            });

          const smapshotFaileds: Array<SnapshotFailed> = [];
          if (isRetry) {
            // using sync process, insertOrUpdateIfNewer to migrate
            for (const data of mongoData) {
              try {
                await this.mongodbService.insertOrUpdateIfNewer(
                  collection,
                  data,
                  null,
                );
              } catch (error) {
                const snapshotFailed: SnapshotFailed = {
                  processId: processId,
                  tableName: mysqlTable,
                  mysqlId: data[this.utilService.MYSQL_ID_FILED],
                  error: error.message,
                };
                smapshotFaileds.push(snapshotFailed);
              }
            }
          } else {
            // using snapshot process, only insert to migrate
            try {
              await collection.insertMany(mongoData);
            } catch (error) {
              for (const data of mongoData) {
                try {
                  await collection.insertOne(data);
                } catch (error) {
                  const snapshotFailed: SnapshotFailed = {
                    processId: processId,
                    tableName: mysqlTable,
                    mysqlId: data[this.utilService.MYSQL_ID_FILED],
                    error: error.message,
                  };
                  smapshotFaileds.push(snapshotFailed);
                }
              }
            }
          }
          if (smapshotFaileds.length > 0)
            await this.snapshotFailedDocument.insertMany(smapshotFaileds);
        } catch (error) {
          const errorMessage = `Error in line from ${start} to ${
            start + pageSize
          }`;
          this.logger.error(errorMessage);
          const snapshotFailed: SnapshotFailed = {
            processId: processId,
            tableName: mysqlTable,
            mysqlId: '',
            error: `${error.message}, ${errorMessage}`,
          };
          await this.snapshotFailedDocument.insertMany(snapshotFailed);
        } finally {
          start += pageSize;
        }
      }
    } catch (error) {
      this.logger.error('@error', error);
      snapshot.status = Status.FAILED;
      snapshot.message = error.message;
    }

    // await mongoClient.close();
    await this.snapshotModel.create(snapshot);

    const name = `${this.DATABASE_SERVER_NAME}.${this.MYSQL_SCHEMA}.${tableMapping.mysqlTable}`;

    const topicExist: Topic = await this.topicModel.findOne({
      processId: processId,
      name: name,
    });

    if (!topicExist) {
      // create listener
      const topic: Topic = {
        processId: processId,
        // DATABASE_SERVER_NAME.MYSQL_SCHEMA.mysqlTable
        name: name,
        offset: '0',
      };

      await this.topicModel.create(topic);
    }
    this.logger.log('Finish migrateSnapshotWithPaging', mysqlTable);
  }

  async checkMigrateSnapshot(processId: number) {
    const snapshotCheckResults: Array<SnapshotCheckResult> = [];

    const snapshots: Array<Snapshot> = await this.findAllById(processId);

    if (snapshots) {
      for (const snapshot of snapshots) {
        const tableMapping = this.tableMappingService.getTableMappingForMysql(
          snapshot.tableName,
        );
        if (!tableMapping) return;

        const mongoClient = await this.mongodbService.getMongoClient(
          tableMapping.mongoDatabase,
        );

        const db = mongoClient.db(tableMapping.mongoDatabase);
        const collection = db.collection(tableMapping.mongoCollection);
        const mongoRecord = await collection.countDocuments();

        const snapshotCheckResult: SnapshotCheckResult = {
          processId: processId,
          mysqlTable: snapshot.tableName,
          mysqlRecord: snapshot.totalMigrated,
          mongoRecord: mongoRecord,
          isMark: snapshot.totalMigrated == mongoRecord,
        };

        snapshotCheckResults.push(snapshotCheckResult);
      }
    }

    const snapshotCheckResultsTrue: Array<SnapshotCheckResult> = [];
    const snapshotCheckResultsFalse: Array<SnapshotCheckResult> = [];
    const listTableMigrated: Set<string> = new Set();

    snapshotCheckResults.forEach((snapshotCheckResult) => {
      listTableMigrated.add(snapshotCheckResult.mysqlTable);
      if (snapshotCheckResult.isMark) {
        snapshotCheckResultsTrue.push(snapshotCheckResult);
      } else {
        snapshotCheckResultsFalse.push(snapshotCheckResult);
      }
    });

    const listTableNotMigrated = [];
    this.tableMappingService.getAllTableMapping().forEach((tableMapping) => {
      if (!listTableMigrated.has(tableMapping.mysqlTable)) {
        listTableNotMigrated.push(tableMapping.mysqlTable);
      }
    });

    return {
      TRUE: snapshotCheckResultsTrue,
      FALSE: snapshotCheckResultsFalse,
      NOT_MIGRATE: listTableNotMigrated,
    };
  }
}
