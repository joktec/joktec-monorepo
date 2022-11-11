import { Module } from '@jobhopin/core';
import { EsModule } from '@jobhopin/elastic';
import { ElasticExampleService } from '@app/elastic/elastic.service';

@Module({
  imports: [EsModule],
  controllers: [],
  providers: [ElasticExampleService],
})
export class ElasticExampleModule {}
