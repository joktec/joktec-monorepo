

import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CommonMicroserviceConfig } from '@baotg/core';

import { SkillController } from './controllers/skill.controller';
import { SkillResolver } from './resolvers';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: commonMicroserviceConfig.name,
        ...commonMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [SkillResolver],
  controllers: [SkillController],
  exports: []
})

export class SkillModule {}
