import { Controller } from '@nestjs/common';
import { JobhopJobCategoryService } from './jobhop-jobcategory.service';
import {
  BaseMicroserviceController,
  JobhopJobCategoryMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-jobcategory')
export class JobhopJobCategoryController extends BaseMicroserviceController(
  JobhopJobCategoryMessagePattern,
) {
  constructor(
    private readonly jobhopJobCategoryService: JobhopJobCategoryService,
  ) {
    super(jobhopJobCategoryService);
  }
}
