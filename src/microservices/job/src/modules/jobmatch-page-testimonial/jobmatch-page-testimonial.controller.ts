import { Controller } from '@nestjs/common';
import { JobMatchPageTestimonialService } from './jobmatch-page-testimonial.service';
import {
  BaseMicroserviceController,
  JobMatchPageTestimonialMessagePattern,
} from '@jobhopin/core';

@Controller('jobmatch-page-testimonial')
export class JobMatchPageTestimonialController extends BaseMicroserviceController(
  JobMatchPageTestimonialMessagePattern,
) {
  constructor(
    private readonly jobMatchPageTestimonialService: JobMatchPageTestimonialService,
  ) {
    super(jobMatchPageTestimonialService);
  }
}
