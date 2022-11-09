import { Module, Global, CoreModule } from '@jobhopin/core';
import { EsService } from './es.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [EsService],
  exports: [EsService],
})
export class EsModule {}
