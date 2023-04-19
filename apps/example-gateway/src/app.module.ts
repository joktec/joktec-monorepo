import { CoreModule, JwtModule, Module } from '@joktec/core';
import { HttpModule } from '@joktec/http';
import { MongoModule } from '@joktec/mongo';
import { CategoryModule } from './modules';

@Module({
  imports: [CoreModule, MongoModule, HttpModule, JwtModule, CategoryModule],
})
export class AppModule {}
