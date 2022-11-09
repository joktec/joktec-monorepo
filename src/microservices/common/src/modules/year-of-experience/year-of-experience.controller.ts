import {
  BaseMicroserviceController,
  YearOfExperienceMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { YearOfExperienceService } from './year-of-experience.service';

@Controller('year-of-experience')
export class YearOfExperienceController extends BaseMicroserviceController(
  YearOfExperienceMessagePattern,
) {
  constructor(
    private readonly yearOfExperienceService: YearOfExperienceService,
  ) {
    super(yearOfExperienceService);
  }
}
