import { CvMicroserviceConfig } from '@jobhopin/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cvMicroserviceConfig = new CvMicroserviceConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(cvMicroserviceConfig.microserviceOptions, {
    inheritAppConfig: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
