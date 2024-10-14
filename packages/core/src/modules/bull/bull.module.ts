import {
  BullModule as NestBullModule,
  BullRootModuleOptions,
  RegisterQueueAsyncOptions,
  RegisterQueueOptions,
} from '@nestjs/bullmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '../config';
import { BullConfig } from './bull.config';

@Module({})
export class BullModule {
  static forRoot(bullConfig?: BullRootModuleOptions): DynamicModule {
    return {
      global: true,
      module: BullModule,
      imports: [
        NestBullModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService): BullRootModuleOptions => {
            const bullCfg = configService.parseOrThrow(BullConfig, 'bull');
            return Object.assign({}, { connection: { ...bullCfg } }, bullConfig);
          },
        }),
      ],
    };
  }

  static registerQueue(...options: RegisterQueueOptions[]): DynamicModule {
    return NestBullModule.registerQueue(...options);
  }

  static registerQueueAsync(...options: RegisterQueueAsyncOptions[]): DynamicModule {
    return NestBullModule.registerQueueAsync(...options);
  }
}
