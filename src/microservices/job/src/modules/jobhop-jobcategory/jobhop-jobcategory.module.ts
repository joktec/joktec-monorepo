import {
  JobhopJobCategory,
  JobhopJobCategorySchema,
} from './schemas/jobhop-jobcategory.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopJobCategoryService } from './jobhop-jobcategory.service';
import { JobhopJobCategoryController } from './jobhop-jobcategory.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopJobCategory.name,
        schema: JobhopJobCategorySchema,
      },
    ]),
  ],
  controllers: [JobhopJobCategoryController],
  providers: [JobhopJobCategoryService],
})
export class JobhopJobCategoryModule {}
