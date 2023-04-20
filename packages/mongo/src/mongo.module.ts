import { Global, Module } from '@joktec/core';
import { MongoService } from './mongo.service';

@Global()
@Module({
  imports: [],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
