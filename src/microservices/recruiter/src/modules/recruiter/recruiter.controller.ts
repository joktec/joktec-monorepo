import { Controller } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import {
  BaseMicroserviceController,
  RecruiterMessagePattern,
} from '@jobhopin/core';

@Controller('recruiter')
export class RecruiterController extends BaseMicroserviceController(
  RecruiterMessagePattern,
) {
  constructor(private readonly recruiterService: RecruiterService) {
    super(recruiterService);
  }
}
