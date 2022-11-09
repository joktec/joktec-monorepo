import { Module } from '@nestjs/common';
import { OrganizationRecruiterService } from './organization-recruiter.service';
import { OrganizationRecruiterController } from './organization-recruiter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationRecruiter, OrganizationRecruiterSchema } from './schemas/organization-recruiter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationRecruiter.name, schema: OrganizationRecruiterSchema }]),
  ],
  controllers: [OrganizationRecruiterController],
  providers: [OrganizationRecruiterService]
})
export class OrganizationRecruiterModule {}
