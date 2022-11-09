import { Controller } from '@nestjs/common';
import { JobCategoryService } from './job-category.service';
import {
  BaseMicroserviceController,
  JobCategoryMessagePattern,
} from '@jobhopin/core';

@Controller('job-category')
export class JobCategoryController extends BaseMicroserviceController(
  JobCategoryMessagePattern,
) {
  constructor(private readonly jobCategoryService: JobCategoryService) {
    super(jobCategoryService);
  }
}
