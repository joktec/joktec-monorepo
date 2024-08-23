import { BullModule as NestBullModule, BullModuleOptions, BullRootModuleOptions } from '@nestjs/bull';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '../config';
import { BullConfig } from './bull.config';

@Global()
@Module({
  imports: [
    NestBullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): BullRootModuleOptions => {
        const bullCfg = configService.parse(BullConfig, 'bull');
        return { redis: { ...bullCfg } };
      },
    }),
  ],
})
export class BullModule {
  static registerQueue(...options: BullModuleOptions[]): DynamicModule {
    return NestBullModule.registerQueue(...options);
  }
}
