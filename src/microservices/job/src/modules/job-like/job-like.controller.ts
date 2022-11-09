import { Controller } from '@nestjs/common';
import { JobLikeService } from './job-like.service';
import {
  BaseMicroserviceController,
  JobLikeMessagePattern,
} from '@jobhopin/core';

@Controller('job-like')
export class JobLikeController extends BaseMicroserviceController(
  JobLikeMessagePattern,
) {
  constructor(private readonly jobLikeService: JobLikeService) {
    super(jobLikeService);
  }
}
