import { Module } from '@nestjs/common';
import { JobseekerViewProfileService } from './jobseeker_view_profile.service';
import { JobseekerViewProfileController } from './jobseeker_view_profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerViewProfile,
  JobseekerViewProfileSchema,
} from './schemas/jobseeker_view_profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerViewProfile.name, schema: JobseekerViewProfileSchema },
    ]),
  ],
  controllers: [JobseekerViewProfileController],
  providers: [JobseekerViewProfileService]
})
export class JobseekerViewProfileModule {}
