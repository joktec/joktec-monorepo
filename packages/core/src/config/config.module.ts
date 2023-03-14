import { Global, Module } from '@nestjs/common';
import { ConfigModule as JsConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends JsConfigModule {}
