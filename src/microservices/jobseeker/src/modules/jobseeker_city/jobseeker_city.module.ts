import { Module } from '@nestjs/common';
import { JobseekerCityService } from './jobseeker_city.service';
import { JobseekerCityController } from './jobseeker_city.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerCity,
  JobseekerCitySchema,
} from './schemas/jobseeker_city.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerCity.name, schema: JobseekerCitySchema },
    ]),
  ],
  controllers: [JobseekerCityController],
  providers: [JobseekerCityService]
})
export class JobseekerCityModule {}
