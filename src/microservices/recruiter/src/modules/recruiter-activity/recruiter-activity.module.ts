import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecruiterActivityService } from './recruiter-activity.service';
import { RecruiterActivityController } from './recruiter-activity.controller';
import {
  RecruiterActivity,
  RecruiterActivitySchema,
} from './schemas/recruiter-activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecruiterActivity.name, schema: RecruiterActivitySchema },
    ]),
  ],
  controllers: [RecruiterActivityController],
  providers: [RecruiterActivityService],
})
export class RecruiterActivityModule {}
