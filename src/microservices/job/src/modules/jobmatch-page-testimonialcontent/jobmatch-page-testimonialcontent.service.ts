import {
  JobMatchPageTestimonialContent,
  JobMatchPageTestimonialContentDocument,
} from './schemas/jobmatch-page-testimonialcontent.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobMatchPageTestimonialContentService extends BaseService<JobMatchPageTestimonialContentDocument> {
  constructor(
    @InjectModel(JobMatchPageTestimonialContent.name)
    private readonly mainModel: Model<JobMatchPageTestimonialContentDocument>,
  ) {
    super(mainModel);
  }
}
