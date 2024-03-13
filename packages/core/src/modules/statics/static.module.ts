import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '../config';
import { initServerStatic } from './static';

@Global()
@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => initServerStatic(cfg),
    }),
  ],
})
export class StaticModule {}
