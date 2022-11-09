import { Controller } from '@nestjs/common';
import { JobFavoriteService } from './job-favorite.service';
import {
  BaseMicroserviceController,
  JobFavoriteMessagePattern,
} from '@jobhopin/core';

@Controller('job-favorite')
export class JobFavoriteController extends BaseMicroserviceController(
  JobFavoriteMessagePattern,
) {
  constructor(private readonly jobFavoriteService: JobFavoriteService) {
    super(jobFavoriteService);
  }
}
