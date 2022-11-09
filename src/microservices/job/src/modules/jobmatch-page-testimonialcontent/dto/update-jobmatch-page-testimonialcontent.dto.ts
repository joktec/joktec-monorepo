import { PartialType } from '@nestjs/mapped-types';
import { CreateJobMatchPageTestimonialContentDto } from './create-jobmatch-page-testimonialcontent.dto';

export class UpdateJobMatchPageTestimonialContentDto extends PartialType(CreateJobMatchPageTestimonialContentDto) {}
