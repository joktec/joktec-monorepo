import { Module } from '@nestjs/common';
import { JobseekerIndustryService } from './jobseeker_industry.service';
import { JobseekerIndustryController } from './jobseeker_industry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerIndustry,
  JobseekerIndustrySchema,
} from './schemas/jobseeker_industry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerIndustry.name, schema: JobseekerIndustrySchema },
    ]),
  ],
  controllers: [JobseekerIndustryController],
  providers: [JobseekerIndustryService]
})
export class JobseekerIndustryModule {}
