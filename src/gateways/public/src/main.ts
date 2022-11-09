import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// Cross-site request forgery (also known as CSRF or XSRF) is a type of malicious exploit of a website where unauthorized commands are transmitted from a user that the web application trusts. To mitigate this kind of attack you can use the csurf package.
import * as csurf from 'csurf';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Public')
    .setDescription('The Public API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerUrl: 'swagger',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      // forbidNonWhitelisted: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);

  app.use(csurf());
}

bootstrap();
