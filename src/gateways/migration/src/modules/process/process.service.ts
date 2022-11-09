import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Process, ProcessDocument } from './schemas/process.schema';
import { CompareObjectService } from './services/compare-object/compare-object.service';
import { SnapshotService } from './services/snapshot/snapshot.service';
import { SyncDataService } from './services/sync-data/sync-data.service';

@Injectable()
export class ProcessService {
  private logger = new Logger(ProcessService.name);

  private MONGODB_DATABASE_ACTIVITY;

  constructor(
    @InjectModel(Process.name)
    private processModel: Model<ProcessDocument>,
    private snapshotService: SnapshotService,
    private syncDataService: SyncDataService,
    private compareObjectService: CompareObjectService,
  ) {
    this.MONGODB_DATABASE_ACTIVITY = process.env.MONGODB_DATABASE_ACTIVITY;
  }

  async findById(processId: number): Promise<Process> {
    return this.processModel.findOne({ processId: processId });
  }

  async migrateSnapshot(
    processId: number,
    databaseInclude: Array<string> = [],
    tableInclude: Array<string> = [],
    databaseExclude: Array<string> = [],
    tableExclude: Array<string> = [],
  ) {
    this.logger.log(`Start creating process with ID = ${processId}`);
    let isRetry = false;
    let process: Process = await this.findById(processId);
    if (process) {
      this.logger.log(`Process with ID = ${processId} existed. Retry staring.`);
      isRetry = true;
    } else {
      databaseExclude.push(this.MONGODB_DATABASE_ACTIVITY);
      process = {
        processId: processId,
        databaseInclude: databaseInclude,
        tableInclude: tableInclude,
        databaseExclude: databaseExclude,
        tableExclude: tableExclude,
      };

      await this.processModel.create(process);
    }

    await this.snapshotService.migrateSnapshot(
      processId,
      process.databaseInclude,
      process.tableInclude,
      process.databaseExclude,
      process.tableExclude,
      isRetry,
    );

    this.logger.log(`Complete creating process with ID = ${processId}`);
  }

  async checkMigrateSnapshot(processId: number) {
    const process: Process = await this.findById(processId);
    if (!process) {
      throw new BadRequestException(`Process not found with ID:, ${processId}`);
    }

    return await this.snapshotService.checkMigrateSnapshot(processId);
  }

  async startSyncDataFromMysqlToMongodb(processId: number) {
    this.logger.log('Start SyncDataFromMysqlToMongodb.');

    const process: Process = await this.findById(processId);

    if (!process) {
      this.logger.log(`Process not found with ID:`, processId);
      return;
    }

    this.syncDataService.callStartSyncFromFromMysqlToMongo();
    process.isAllowSync = true;
    await this.processModel.findOneAndUpdate(
      { processId: process.processId },
      process,
    );
  }

  async stopSyncDataFromMysqlToMongodb(processId: number) {
    this.logger.log('Stop SyncDataFromMysqlToMongodb.');

    const process: Process = await this.findById(processId);

    if (!process) {
      this.logger.log(`Process not found with ID:`, processId);
      return;
    }

    process.isAllowSync = false;
    await this.processModel.findOneAndUpdate(
      { processId: process.processId },
      process,
    );
  }

  async compareObjectAll(numbeRecordTest: number) {
    return await this.compareObjectService.compareObjectAll(numbeRecordTest);
  }

  async compareObjectByDatabase(
    mongoDatabase: string,
    numbeRecordTest: number,
  ) {
    return await this.compareObjectService.compareObjectByDatabase(
      mongoDatabase,
      numbeRecordTest,
    );
  }

  async compareObjectByMysqlTable(mysqlTable: string, numbeRecordTest: number) {
    return await this.compareObjectService.compareObjectByMysqlTable(
      mysqlTable,
      numbeRecordTest,
    );
  }
}
