import { Module } from '@nestjs/common';
import { JobseekerLocationService } from './jobseeker_location.service';
import { JobseekerLocationController } from './jobseeker_location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerLocation,
  JobseekerLocationSchema,
} from './schemas/jobseeker_location.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerLocation.name, schema: JobseekerLocationSchema },
    ]),
  ],
  controllers: [JobseekerLocationController],
  providers: [JobseekerLocationService]
})
export class JobseekerLocationModule {}
