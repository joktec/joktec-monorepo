import { Module } from '@jobhopin/core';
import { JobRepo, MysqlModule } from '@jobhopin/mysql';
import { JobService } from '@app/mysql/job';
import { MysqlExampleService } from '@app/mysql/mysql.service';

@Module({
  imports: [MysqlModule],
  controllers: [],
  providers: [MysqlExampleService, JobService, JobRepo],
})
export class MysqlExampleModule {}
