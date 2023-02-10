import { CoreModule, Global, Module } from '@baotg/core';
import { BigQueryService } from './big-query.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [BigQueryService],
  exports: [BigQueryService],
})
export class BigQueryModule {}
