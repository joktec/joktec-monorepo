import { Module } from '@nestjs/common';
import { OrganizationFirstJobService } from './organization-first-job.service';
import { OrganizationFirstJobController } from './organization-first-job.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationFirstJob, OrganizationFirstJobSchema } from './schemas/organization-first-job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationFirstJob.name, schema: OrganizationFirstJobSchema }]),
  ],
  controllers: [OrganizationFirstJobController],
  providers: [OrganizationFirstJobService]
})
export class OrganizationFirstJobModule {}
