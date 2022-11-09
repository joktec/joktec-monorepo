import { Module } from '@nestjs/common';
import { JobseekerJobAlertService } from './jobseeker_job_alert.service';
import { JobseekerJobAlertController } from './jobseeker_job_alert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerJobAlert,
  JobseekerJobAlertSchema,
} from './schemas/jobseeker_job_alert.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerJobAlert.name, schema: JobseekerJobAlertSchema },
    ]),
  ],
  controllers: [JobseekerJobAlertController],
  providers: [JobseekerJobAlertService]
})
export class JobseekerJobAlertModule {}
