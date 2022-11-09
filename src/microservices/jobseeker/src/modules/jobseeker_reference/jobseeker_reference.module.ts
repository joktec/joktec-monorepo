import { Module } from '@nestjs/common';
import { JobseekerReferenceService } from './jobseeker_reference.service';
import { JobseekerReferenceController } from './jobseeker_reference.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerReference,
  JobseekerReferenceSchema,
} from './schemas/jobseeker_reference.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerReference.name, schema: JobseekerReferenceSchema },
    ]),
  ],
  controllers: [JobseekerReferenceController],
  providers: [JobseekerReferenceService]
})
export class JobseekerReferenceModule {}
