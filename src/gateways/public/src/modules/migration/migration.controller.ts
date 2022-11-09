import { firstValueFrom } from 'rxjs';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Inject,
  InternalServerErrorException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  MigrationMongoMicroserviceConfig,
  MigrationMysqlSnapshotMicroserviceConfig,
  MigrationMysqlBinlogMicroserviceConfig,
  MigrationMessagePattern,
  validateBody,
} from '@jobhopin/core';
import { MigrateSnapshotInput } from './inputs/migrate-snapshot.input';

const migrationMysqlSnapshotMicroserviceConfig =
  new MigrationMysqlSnapshotMicroserviceConfig();
const migrationMongoMicroserviceConfig = new MigrationMongoMicroserviceConfig();
const migrationMysqlBinlogMicroserviceConfig =
  new MigrationMysqlBinlogMicroserviceConfig();

@Controller('migration')
export class MigrationController {
  constructor(
    @Inject(migrationMysqlSnapshotMicroserviceConfig.name)
    private readonly snapshotMicroservice: ClientProxy,
    @Inject(migrationMongoMicroserviceConfig.name)
    private readonly mongoMicroservice: ClientProxy,
    @Inject(migrationMysqlBinlogMicroserviceConfig.name)
    private readonly binlogMicroservice: ClientProxy,
  ) {}

  /*
   * Request for snapshot process
   *
   */
  @Post('/migrate-snapshot')
  async migrateSnapshot(
    @Query('processId') processId: number,
    @Body() migrateSnapshotInput: MigrateSnapshotInput,
  ) {
    if (!processId) {
      throw new BadRequestException("Process ID can not be null");
    }
    try {
      return await firstValueFrom(
        this.snapshotMicroservice.send(
          MigrationMessagePattern.MIGRATION_SNAPSHOT,
          { processId, ...migrateSnapshotInput },
        ),
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get('/migrate-snapshot-check')
  async migrateSnapshotCheck(@Query('processId') processId: number) {
    if (!processId) {
      throw new BadRequestException("Process ID can not be null");
    }

    try {
      return await firstValueFrom(
        this.snapshotMicroservice.send(
          "MigrationMessagePattern_MIGRATION_SNAPSHOT_CHECK",
          {processId},
        ),
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  /*
   * Request for sync data
   *   from MySQL to MongoDB
   */
  @Get('/start-listener-from-binlog')
  async startListenerFromBinlog(@Query('processId') processId: number) {
    if (!processId) {
      throw new BadRequestException("Process ID can not be null");
    }
    try {
      return await firstValueFrom(
        this.binlogMicroservice.send(
          MigrationMessagePattern.START_LISTENER_FROM_BIN_BLOG,
          processId,
        ),
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get('/stop-listener-from-binlog')
  async stopListenerFromBinlog(@Query('processId') processId: number) {
    if (!processId) {
      throw new BadRequestException("Process ID can not be null");
    }
    try {
      return await firstValueFrom(
        this.binlogMicroservice.send(
          MigrationMessagePattern.STOP_LISTENER_FROM_BIN_BLOG,
          processId,
        ),
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get('/start-sync-data-from-mysql-to-mongo')
  async startSyncDataFromMysqlToMongodb(@Query('processId') processId: number) {
    if (!processId) {
      throw new BadRequestException("Process ID can not be null");
    }
    try {
      return await firstValueFrom(
        this.mongoMicroservice.send(
          MigrationMessagePattern.START_SYNC_DATA_FROM_MYSQL_TO_MONGO,
          processId,
        ),
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get('/stop-sync-data-from-mysql-to-mongo')
  async stopSyncDataFromMysqlToMongodb(@Query('processId') processId: number) {
    if (!processId) {
      throw new BadRequestException("Process ID can not be null");
    }
    try {
      return await firstValueFrom(
        this.mongoMicroservice.send(
          MigrationMessagePattern.STOP_SYNC_DATA_FROM_MYSQL_TO_MONGO,
          processId,
        ),
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
