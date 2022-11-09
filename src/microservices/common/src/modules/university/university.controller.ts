import {
  BaseMicroserviceController,
  UniversityMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { UniversityService } from './university.service';
import { PLURAL_NAME } from './university.constants';

@Controller(PLURAL_NAME)
export class UniversityController extends BaseMicroserviceController(
  UniversityMessagePattern,
) {
  constructor(private readonly universityService: UniversityService) {
    super(universityService);
  }
}
