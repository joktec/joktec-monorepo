import { Global, Module } from '@nestjs/common';
import { ConfigModule as JsConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends JsConfigModule {}
