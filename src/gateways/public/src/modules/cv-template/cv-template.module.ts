import { CvMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CvTemplateResolver } from './cv-template.resolver';

const cvMicroserviceConfig = new CvMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: cvMicroserviceConfig.name,
        ...cvMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [CvTemplateResolver],
  controllers: [],
  exports: [],
})
export class CvTemplateModule {}
