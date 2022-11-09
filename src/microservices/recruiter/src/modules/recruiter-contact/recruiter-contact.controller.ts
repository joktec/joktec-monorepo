import { Controller } from '@nestjs/common';
import { RecruiterContactService } from './recruiter-contact.service';
import {
  BaseMicroserviceController,
  RecruiterContactMessagePattern,
} from '@jobhopin/core';

@Controller('recruiter-contact')
export class RecruiterContactController extends BaseMicroserviceController(
  RecruiterContactMessagePattern,
) {
  constructor(
    private readonly recruiterContactService: RecruiterContactService,
  ) {
    super(recruiterContactService);
  }
}
