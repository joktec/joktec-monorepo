import { Module, Global, CoreModule } from '@baotg/core';
import { EsService } from './es.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [EsService],
  exports: [EsService],
})
export class EsModule {}
