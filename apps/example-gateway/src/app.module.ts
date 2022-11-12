import { CoreModule, Module } from '@baotg/core';
import { ElasticExampleModule } from '@app/elastic/elastic.module';
import { MysqlExampleModule } from '@app/mysql/mysql.module';

@Module({
  imports: [
    CoreModule,
    // ElasticExampleModule,
    // MysqlExampleModule,
  ],
})
export class AppModule {}
