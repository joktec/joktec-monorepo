import { timestampsPlugin, UserMicroserviceConfig } from '@jobhopin/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';

import { AppModule } from './app.module';

const userMicroserviceConfig = new UserMicroserviceConfig();

async function bootstrap() {
  mongoose.plugin(timestampsPlugin);

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(userMicroserviceConfig.microserviceOptions, {
    inheritAppConfig: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
