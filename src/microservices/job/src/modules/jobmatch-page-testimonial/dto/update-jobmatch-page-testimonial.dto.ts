import { PartialType } from '@nestjs/mapped-types';
import { CreateJobMatchPageTestimonialDto } from './create-jobmatch-page-testimonial.dto';

export class UpdateJobMatchPageTestimonialDto extends PartialType(CreateJobMatchPageTestimonialDto) {}
