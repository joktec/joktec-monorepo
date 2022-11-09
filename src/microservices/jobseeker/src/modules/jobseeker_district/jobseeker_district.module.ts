import { Module } from '@nestjs/common';
import { JobseekerDistrictService } from './jobseeker_district.service';
import { JobseekerDistrictController } from './jobseeker_district.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerDistrict,
  JobseekerDistrictSchema,
} from './schemas/jobseeker_district.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerDistrict.name, schema: JobseekerDistrictSchema },
    ]),
  ],
  controllers: [JobseekerDistrictController],
  providers: [JobseekerDistrictService]
})
export class JobseekerDistrictModule {}
