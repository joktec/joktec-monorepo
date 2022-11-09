import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { ProcessService } from './process.service';

interface IMigrateSnapshot {
  databaseInclude: Array<string>;
  tableInclude: Array<string>;
  databaseExclude: Array<string>;
  tableExclude: Array<string>;
}

@Controller('process')
export class ProcessController {
  private profile: string;

  constructor(private readonly processService: ProcessService) {
    this.profile = process.env.NODE_PROFILE;
  }

  /*
   * Request for snapshot process
   *
   */
  @Post('/migrate-snapshot')
  migrateSnapshot(
    @Query('processId') processId: number,
    @Body() migrateSnapshot: IMigrateSnapshot,
  ) {
    if (!processId) {
      throw new BadRequestException('Process ID can not be null');
    }
    this.processService.migrateSnapshot(
      processId,
      migrateSnapshot.databaseInclude,
      migrateSnapshot.tableInclude,
      migrateSnapshot.databaseExclude,
      migrateSnapshot.tableExclude,
    );
    return {
      message: 'migratesnapshot success.',
    };
  }

  @Get('/check-migrate-snapshot')
  async checkMigrateSnapshot(@Query('processId') processId: number) {
    if (!processId) {
      throw new BadRequestException('Process ID can not be null');
    }
    return await this.processService.checkMigrateSnapshot(processId);
  }

  @Get('/start-sync-data-from-mysql-to-mongo')
  startSyncDataFromMysqlToMongodb(@Query('processId') processId: number) {
    if (!processId) {
      throw new BadRequestException('Process ID can not be null');
    }
    this.processService.startSyncDataFromMysqlToMongodb(processId);
    return {
      message: 'SyncDataFromMysqlToMongodb starting.',
    };
  }

  @Get('/stop-sync-data-from-mysql-to-mongo')
  stopSyncDataFromMysqlToMongodb(@Query('processId') processId: number) {
    if (!processId) {
      throw new BadRequestException('Process ID can not be null');
    }
    this.processService.stopSyncDataFromMysqlToMongodb(processId);
    return {
      message: 'SyncDataFromMysqlToMongodb Stopped.',
    };
  }

  @Get('/compare-object-all')
  async compareObjectAll(@Query('numbeRecordTest') numbeRecordTest: number) {
    return await this.processService.compareObjectAll(numbeRecordTest);
  }

  @Get('/compare-object-by-database')
  async compareObjectByDatabase(
    @Query('mongoDatabase') mongoDatabase: string,
    @Query('numbeRecordTest') numbeRecordTest: number,
  ) {
    return await this.processService.compareObjectByDatabase(
      mongoDatabase,
      numbeRecordTest,
    );
  }

  @Get('/compare-object-by-table')
  async compareObjectByMysqlTable(
    @Query('mysqlTable') mysqlTable: string,
    @Query('numbeRecordTest') numbeRecordTest: number,
  ) {
    return await this.processService.compareObjectByMysqlTable(
      mysqlTable,
      numbeRecordTest,
    );
  }
}
