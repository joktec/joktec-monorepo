import { Controller } from '@nestjs/common';
import { JobseekerService } from './jobseeker.service';

@Controller()
export class JobseekerController {
  constructor(private readonly jobseekerService: JobseekerService) {}
}
