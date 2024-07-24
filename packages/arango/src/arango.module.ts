import { Global, Module } from '@joktec/core';
import { ArangoService } from './arango.service';

@Global()
@Module({
  imports: [],
  providers: [ArangoService],
  exports: [ArangoService],
})
export class ArangoModule {}
