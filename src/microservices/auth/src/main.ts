import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';

import { AuthMicroserviceConfig, timestampsPlugin } from '@jobhopin/core';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const authMicroserviceConfig = new AuthMicroserviceConfig();

async function bootstrap() {
  mongoose.plugin(timestampsPlugin);
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(authMicroserviceConfig.microserviceOptions, {
    inheritAppConfig: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
