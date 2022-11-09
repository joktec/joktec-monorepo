import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessModule } from './modules/process/process.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `${process.env.MONGODB_URL_MIGRATION}/${process.env.MONGODB_DATABASE_MIGRATION}?authSource=admin`,
    ),
    HealthModule,
    ProcessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);
  onModuleInit() {
    this.logger.log(`Migration version: ${process.env.MIGRATION_VERSION}`);
  }
}
