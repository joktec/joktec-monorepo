import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerLanguage, JobseekerLanguageDocument } from './schemas/jobseeker_language.schema';

@Injectable()
export class JobseekerLanguageService extends BaseService<JobseekerLanguageDocument>{
  constructor(
    @InjectModel(JobseekerLanguage.name)
    private JobseekerLanguageModel: Model<JobseekerLanguageDocument>,
  ) {
    super(JobseekerLanguageModel);
  }
}
