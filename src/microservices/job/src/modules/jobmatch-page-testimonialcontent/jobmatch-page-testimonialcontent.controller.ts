import { Controller } from '@nestjs/common';
import { JobMatchPageTestimonialContentService } from './jobmatch-page-testimonialcontent.service';
import {
  BaseMicroserviceController,
  JobMatchPageTestimonialContentMessagePattern,
} from '@jobhopin/core';

@Controller('jobmatch-page-testimonialcontent')
export class JobMatchPageTestimonialContentController extends BaseMicroserviceController(
  JobMatchPageTestimonialContentMessagePattern,
) {
  constructor(
    private readonly jobMatchPageTestimonialContentService: JobMatchPageTestimonialContentService,
  ) {
    super(jobMatchPageTestimonialContentService);
  }
}
