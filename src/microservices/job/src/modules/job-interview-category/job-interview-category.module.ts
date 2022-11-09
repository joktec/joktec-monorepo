import {
  JobInterviewCategory,
  JobInterviewCategorySchema,
} from './schemas/job-interview-category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobInterviewCategoryService } from './job-interview-category.service';
import { JobInterviewCategoryController } from './job-interview-category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobInterviewCategory.name, schema: JobInterviewCategorySchema },
    ]),
  ],
  controllers: [JobInterviewCategoryController],
  providers: [JobInterviewCategoryService],
})
export class JobInterviewCategoryModule {}
