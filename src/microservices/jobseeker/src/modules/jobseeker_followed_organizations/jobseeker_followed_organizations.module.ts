import { Module } from '@nestjs/common';
import { JobseekerFollowedOrganizationsService } from './jobseeker_followed_organizations.service';
import { JobseekerFollowedOrganizationsController } from './jobseeker_followed_organizations.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerFollowedOrganizations,
  JobseekerFollowedOrganizationsSchema,
} from './schemas/jobseeker_followed_organizations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerFollowedOrganizations.name, schema: JobseekerFollowedOrganizationsSchema },
    ]),
  ],
  controllers: [JobseekerFollowedOrganizationsController],
  providers: [JobseekerFollowedOrganizationsService]
})
export class JobseekerFollowedOrganizationsModule {}
