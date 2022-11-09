import { Global, Module } from '@nestjs/common';
import { microPromInterceptors } from './micro-prom.interceptor';
import { MicroRest } from './micro.rest';

@Global()
@Module({
  controllers: [MicroRest],
  providers: [...microPromInterceptors],
  exports: [...microPromInterceptors],
})
export class MicroModule {}
