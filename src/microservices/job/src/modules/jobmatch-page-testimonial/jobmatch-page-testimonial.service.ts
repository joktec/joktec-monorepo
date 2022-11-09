import {
  JobMatchPageTestimonial,
  JobMatchPageTestimonialDocument,
} from './schemas/jobmatch-page-testimonial.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobMatchPageTestimonialService extends BaseService<JobMatchPageTestimonialDocument> {
  constructor(
    @InjectModel(JobMatchPageTestimonial.name)
    private readonly mainModel: Model<JobMatchPageTestimonialDocument>,
  ) {
    super(mainModel);
  }
}
