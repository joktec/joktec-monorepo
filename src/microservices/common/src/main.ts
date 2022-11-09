import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { CommonMicroserviceConfig, timestampsPlugin } from '@jobhopin/core';
import { AppModule } from './app.module';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

async function bootstrap() {
  mongoose.plugin(timestampsPlugin);

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(commonMicroserviceConfig.microserviceOptions, {
    inheritAppConfig: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
