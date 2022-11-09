import { NestFactory } from '@nestjs/core';
import { MarketInsightMicroserviceConfig } from '@jobhopin/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const marketInsightMicroserviceConfig = new MarketInsightMicroserviceConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(marketInsightMicroserviceConfig.microserviceOptions, {
    inheritAppConfig: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
