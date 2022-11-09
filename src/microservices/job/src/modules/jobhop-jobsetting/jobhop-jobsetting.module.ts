import {
  JobhopJobSetting,
  JobhopJobSettingSchema,
} from './schemas/jobhop-jobsetting.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopJobSettingService } from './jobhop-jobsetting.service';
import { JobhopJobSettingController } from './jobhop-jobsetting.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopJobSetting.name,
        schema: JobhopJobSettingSchema,
      },
    ]),
  ],
  controllers: [JobhopJobSettingController],
  providers: [JobhopJobSettingService],
})
export class JobhopJobSettingModule {}
