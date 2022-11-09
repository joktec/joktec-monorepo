import { Module } from '@nestjs/common';
import { JobseekerDirectlyApplyService } from './jobseeker_directly_apply.service';
import { JobseekerDirectlyApplyController } from './jobseeker_directly_apply.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerDirectlyApply,
  JobseekerDirectlyApplySchema,
} from './schemas/jobseeker_directly_apply.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerDirectlyApply.name, schema: JobseekerDirectlyApplySchema },
    ]),
  ],
  controllers: [JobseekerDirectlyApplyController],
  providers: [JobseekerDirectlyApplyService]
})
export class JobseekerDirectlyApplyModule {}
