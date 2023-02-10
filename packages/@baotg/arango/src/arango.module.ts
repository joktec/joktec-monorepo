import { CoreModule, Module, Global } from '@baotg/core';
import { ArangoService } from './arango.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [ArangoService],
  exports: [ArangoService],
})
export class ArangoModule {}
