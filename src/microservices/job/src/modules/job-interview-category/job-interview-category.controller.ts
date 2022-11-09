import { Controller } from '@nestjs/common';
import { JobInterviewCategoryService } from './job-interview-category.service';
import {
  BaseMicroserviceController,
  JobInterviewCategoryMessagePattern,
} from '@jobhopin/core';

@Controller('job-interview-category')
export class JobInterviewCategoryController extends BaseMicroserviceController(
  JobInterviewCategoryMessagePattern,
) {
  constructor(
    private readonly jobInterviewCategoryService: JobInterviewCategoryService,
  ) {
    super(jobInterviewCategoryService);
  }
}
