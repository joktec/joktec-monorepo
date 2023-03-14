import { CoreModule, Global, Module } from '@joktec/core';
import { BigQueryService } from './bigquery.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [BigQueryService],
  exports: [BigQueryService],
})
export class BigQueryModule {}
