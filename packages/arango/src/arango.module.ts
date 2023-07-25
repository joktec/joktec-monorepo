import { CoreModule, Global, Module } from '@joktec/core';
import { ArangoService } from './arango.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [ArangoService],
  exports: [ArangoService],
})
export class ArangoModule {}
