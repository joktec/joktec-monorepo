import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopJobLocationService } from './jobhop-joblocation.service';
import { JobhopJobLocationController } from './jobhop-joblocation.controller';
import {
  JobhopJobLocation,
  JobhopJobLocationSchema,
} from './schemas/jobhop-joblocation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopJobLocation.name,
        schema: JobhopJobLocationSchema,
      },
    ]),
  ],
  controllers: [JobhopJobLocationController],
  providers: [JobhopJobLocationService],
})
export class JobhopJobLocationModule {}
