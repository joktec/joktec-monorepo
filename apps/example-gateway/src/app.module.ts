import { CoreModule, JwtModule, Module } from '@joktec/core';
import { HttpModule } from '@joktec/http';
import { MongoModule } from '@joktec/mongo';
import { MysqlModule } from '@joktec/mysql';
import { CategoryModule, ProductModule } from './modules';

@Module({
  imports: [
    // Libs
    CoreModule,
    MysqlModule,
    MongoModule,
    HttpModule,
    JwtModule,
    // Modules
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
