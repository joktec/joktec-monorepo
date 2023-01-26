import { Module, Global } from '@baotg/core';
import { MongoService } from './mongo.service';

@Global()
@Module({
  imports: [],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
