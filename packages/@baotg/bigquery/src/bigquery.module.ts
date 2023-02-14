import { CoreModule, Global, Module } from '@baotg/core';
import { BigQueryService } from './bigquery.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [BigQueryService],
  exports: [BigQueryService],
})
export class BigQueryModule {}
