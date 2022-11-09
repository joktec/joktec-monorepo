import { InterviewMicroserviceConfig } from '@jobhopin/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(interviewMicroserviceConfig.microserviceOptions, {
    inheritAppConfig: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
