import {
  BullModule as NestBullModule,
  BullRootModuleOptions,
  RegisterFlowProducerOptions,
  RegisterQueueAsyncOptions,
  RegisterQueueOptions,
} from '@nestjs/bullmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '../config';
import { BullConfig } from './bull.config';

@Module({})
export class BullModule {
  static forRoot(bullConfig?: BullRootModuleOptions): DynamicModule {
    const modules = [
      NestBullModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): BullRootModuleOptions => {
          const bullCfg = configService.parseOrThrow(BullConfig, 'bull');
          return Object.assign({}, { connection: { ...bullCfg } }, bullConfig);
        },
      }),
    ];

    return { global: true, module: BullModule, imports: [...modules] };
  }

  static registerQueue(...options: RegisterQueueOptions[]): DynamicModule {
    return NestBullModule.registerQueue(...options);
  }

  static registerQueueAsync(...options: RegisterQueueAsyncOptions[]): DynamicModule {
    return NestBullModule.registerQueueAsync(...options);
  }

  static registerFlowProducer(...options: RegisterFlowProducerOptions[]): DynamicModule {
    return NestBullModule.registerFlowProducer(...options);
  }
}
