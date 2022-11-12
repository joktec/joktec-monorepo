import { Module } from '@baotg/core';
import { EsModule } from '@baotg/elastic';
import { ElasticExampleService } from '@app/elastic/elastic.service';

@Module({
  imports: [EsModule],
  controllers: [],
  providers: [ElasticExampleService],
})
export class ElasticExampleModule {}
