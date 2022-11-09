import { Module } from '@nestjs/common';
import { JobseekerService } from './jobseeker.service';
import { JobseekerController } from './jobseeker.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  Jobseeker,
  JobseekerSchema,
} from './schemas/jobseeker.schema';
import { UserMicroserviceConfig } from '@jobhopin/core';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const userMicroserviceConfig = new UserMicroserviceConfig();
@Module({
  imports: [MongooseModule.forFeature([{ name: Jobseeker.name, schema: JobseekerSchema }])],

  controllers: [JobseekerController],
  providers: [
    JobseekerService, 
    {
      provide: userMicroserviceConfig.name,
      useFactory: () => {
        return ClientProxyFactory.create(userMicroserviceConfig.microserviceOptions);
      },
      inject: []
    }
  ]
})
export class JobseekerModule {}
