import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

console.log('@process.env.SHARED_SERVICE_MONGODB_URL', process.env.SHARED_SERVICE_MONGODB_URL);
@Module({
  imports: [MongooseModule.forRoot(process.env.SHARED_SERVICE_MONGODB_URL), HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
