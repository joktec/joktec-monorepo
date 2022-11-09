import { LuckySpinMicroserviceConfig } from '@jobhopin/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

const luckySpinMicroserviceConfig = new LuckySpinMicroserviceConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(luckySpinMicroserviceConfig.microserviceOptions, {
    inheritAppConfig: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
