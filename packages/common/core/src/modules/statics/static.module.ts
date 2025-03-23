import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

@Global()
@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class StaticModule extends ServeStaticModule {}
