import { Global, Module } from '@joktec/core';
import { HttpModule } from '@joktec/http';
import { ElasticService } from './elastic.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ElasticService],
  exports: [ElasticService],
})
export class ElasticModule {}
