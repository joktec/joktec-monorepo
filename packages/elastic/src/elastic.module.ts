import { Global, Module } from '@joktec/core';
import { HttpModule as NestHttpModule } from '@nestjs/axios';
import { ElasticService } from './elastic.service';

@Global()
@Module({
  imports: [NestHttpModule],
  providers: [ElasticService],
  exports: [ElasticService],
})
export class ElasticModule {}
