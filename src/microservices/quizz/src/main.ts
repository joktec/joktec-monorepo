import { QuizzMicroserviceConfig } from '@jobhopin/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(quizzMicroserviceConfig.microserviceOptions, {
    inheritAppConfig: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
