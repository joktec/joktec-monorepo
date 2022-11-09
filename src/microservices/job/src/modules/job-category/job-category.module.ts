import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobCategoryService } from './job-category.service';
import { JobCategoryController } from './job-category.controller';
import { JobCategory, JobCategorySchema } from './schemas/job-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobCategory.name, schema: JobCategorySchema },
    ]),
  ],
  controllers: [JobCategoryController],
  providers: [JobCategoryService],
})
export class JobCategoryModule {}
