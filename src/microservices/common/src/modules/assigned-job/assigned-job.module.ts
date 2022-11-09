import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignedJobService } from './assigned-job.service';
import { AssignedJobController } from './assigned-job.controller';
import { AssignedJob, AssignedJobSchema } from './schemas/assigned-job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssignedJob.name, schema: AssignedJobSchema },
    ]),
  ],
  providers: [AssignedJobService],
  controllers: [AssignedJobController],
  exports: [AssignedJobService],
})
export class AssignedJobModule {}
