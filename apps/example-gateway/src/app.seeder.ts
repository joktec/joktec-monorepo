import { ConfigModule, ConfigService, createPinoHttp, initConfig, LoggerModule } from '@joktec/core';
import { MongoModule } from '@joktec/mongo';
import { seeder } from 'nestjs-seeder';
import { UserSeeder } from './modules/users';
import { UserRepo } from './repositories';

seeder({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [initConfig] }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => createPinoHttp(cfg),
    }),
    MongoModule,
  ],
  providers: [UserRepo],
}).run([UserSeeder]);
