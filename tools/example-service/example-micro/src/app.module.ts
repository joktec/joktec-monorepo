import { CoreModule, Module } from '@jobhopin/core';
import { ElasticExampleModule } from '@app/elastic/elastic.module';

@Module({
  imports: [CoreModule, ElasticExampleModule],
  exports: [ElasticExampleModule],
})
export class AppModule {}
