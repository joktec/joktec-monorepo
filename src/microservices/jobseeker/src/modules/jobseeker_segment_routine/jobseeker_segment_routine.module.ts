import { Module } from '@nestjs/common';
import { JobseekerSegmentRoutineService } from './jobseeker_segment_routine.service';
import { JobseekerSegmentRoutineController } from './jobseeker_segment_routine.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerSegmentRoutine,
  JobseekerSegmentRoutineSchema,
} from './schemas/jobseeker_segment_routine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerSegmentRoutine.name, schema: JobseekerSegmentRoutineSchema },
    ]),
  ],
  controllers: [JobseekerSegmentRoutineController],
  providers: [JobseekerSegmentRoutineService]
})
export class JobseekerSegmentRoutineModule {}
