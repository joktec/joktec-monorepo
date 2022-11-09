import { CoreModule, Module } from '@jobhopin/core';
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
