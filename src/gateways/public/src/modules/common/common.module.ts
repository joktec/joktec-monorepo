import { SuggestedSkillResolver } from './resolvers/suggested-skill.resolver';
import { CommonMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { IndustryResolver } from './resolvers/industry.resolver';

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
  providers: [IndustryResolver, SuggestedSkillResolver],
  controllers: [],
  exports: [],
})
export class CommonModule { }
