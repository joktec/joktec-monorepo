import { Global, Module } from '@joktec/core';
import { BigQueryService } from './bigquery.service';

@Global()
@Module({
  imports: [],
  providers: [BigQueryService],
  exports: [BigQueryService],
})
export class BigQueryModule {}
